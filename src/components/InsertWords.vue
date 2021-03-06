<template>
  <!-- TODO: Make separate Modal Component -->
  <transition name="fade">
  <div 
    class="modal-container"
    ref="modalContainer"
    v-on:click="(event) => (event.target == this.$refs.modalContainer) ? this.toggleInsertModal() : null"
  >
    <div id="insertModal" class="modal card">
      <div class="modal-header">
        <p>add a new word</p>
      </div>
      <div class="modal-content">
        <textarea placeholder="Separate words with a newline" style="flex-grow: 1" v-model="textareaValue" autofocus></textarea>
      </div>
      <div class="modal-footer">
        <button id="neg-btn" class="clean-btn rounded-btn transition-btn" v-on:click="this.toggleInsertModal">cancel</button>
        <button id="add-btn" class="clean-btn rounded-btn transition-btn" v-on:click="handleInsert">add</button>
      </div>
    </div>
  </div>
  </transition>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { vocabularyRef } from "../firebase";

export default {
  name: "InsertWords",
  computed: {
    ...mapState(["wordsApiKey", "existingWords"]),
    textareaValue: {
      get() {
        return this.$store.getters.textareaValue;
      },
      set(newTextareaValue) {
        this.updateTextareaValue(newTextareaValue);
      }
    }
  },
  methods: {
    ...mapMutations(["toggleInsertModal", "updateTextareaValue"]),
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
      vocabularyRef.add({
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
* {
  padding: 0;
  margin: 0;
}

#add-btn:hover {
  background-color: #00b894;
  color: white;
}

.modal-container {
  position: fixed;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

#insertModal {
  color: black;
  height: fit-content;
}

.modal {
  width: 30%;
  border-radius: 0.3em;
  background: white;
  overflow: hidden;
}

.modal-header {
  display: flex;
  border-bottom: 1px solid #dfe6e9;
  padding: 0.2em 0.8em;
  font-size: 1.5em;
  color: white;
  background-color: #0984e3;
}

.modal-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex-grow: 1;
}

.modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 1em;
}

textarea {
  border: none;
  resize: none;
  outline: none;
  height: 10em;
  padding: 1em;
  font-size: 1.5em;
}
</style>
