<template>
  <div 
    class="modalContainer"
    ref="modalContainer"
    v-on:click="(event) => (event.target == this.$refs.modalContainer) ? this.toggleInsertModal() : null"
  >
    <div id="insertModal">
        <textarea v-model="textareaValue"></textarea>
        <button v-on:click="handleInsert">Insert Word</button>
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
.modalContainer {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
}

#insertModal {
  background: #263238;
  width: 50%;
  height: 50%;
}
</style>
