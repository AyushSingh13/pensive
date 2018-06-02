<template>
  <!-- TODO: Make separate Modal Component -->
  <div 
    class="modal-container"
    ref="modalContainer"
    v-on:click="(event) => (event.target == this.$refs.modalContainer) ? this.toggleInsertModal() : null"
  >
    <div id="insertModal" class="modal card">
      <div class="modal-header">
        <p>insert</p>
        <button id="closeModal" v-on:click="this.toggleInsertModal">&times;</button>
      </div>
      <div class="modal-content">
        <textarea style="flex-grow: 1" v-model="textareaValue"></textarea>
      </div>
      <div class="modal-footer">
        <button v-on:click="handleInsert">insert words</button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { vocabularyRef } from "../firebase";

export default {
  name: "InsertWords",
  data: () => ({
    textareaValue: ""
  }),
  computed: {
    ...mapState(["wordsApiKey", "existingWords"])
  },
  methods: {
    ...mapMutations(["toggleInsertModal"]),
    wordAlreadyExists(word) {
      return this.existingWords.map(wordObj => wordObj.word).includes(word);
    },
    pullWordFromApi(word) {
      fetch("https://wordsapiv1.p.mashape.com/words/" + word.toLowerCase(), {
        method: "GET",
        headers: {
          "X-Mashape-Key": this.wordsApiKey,
          Accept: "application/json"
        }
      })
        .then(response => response.json())
        .then(data => this.writeToJson(data));
    },
    returnDefinitionsArray(results) {
      let definitions = [];
      results.forEach(item =>
        definitions.push({
          partOfSpeech: item.partOfSpeech,
          definition: item.definition
        })
      );
      return definitions;
    },
    splitByNewline(text) {
      return text.split("\n");
    },
    getNewWords(wordsArray) {
      return wordsArray.filter(word => !this.wordAlreadyExists(word));
    },
    writeToJson(data) {
      vocabularyRef.push({
        word: data.word,
        definitions: this.returnDefinitionsArray(data.results)
      });
    },
    handleInsert() {
      if (this.textareaValue != "") {
        this.getNewWords(this.splitByNewline(this.textareaValue)).map(word =>
          this.pullWordFromApi(word)
        );
      }
    }
  }
};
</script>

<style scoped>
.modal-container {
  position: fixed;
  z-index: 1;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  animation-name: fade-in;
  animation-duration: 0.5s;
}

#insertModal {
  color: black;
}

.modal {
  display: grid;
  grid-template-rows: 1fr 8fr 1fr;
  width: 50%;
  height: 50%;
  background: white;
}

.card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5em;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.modal-footer {
  display: flex;
  justify-content: center;
  padding: 1em;
}

#closeModal {
  display: flex;
  justify-content: center;
  align-items: center;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fade-out {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
