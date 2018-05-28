<template>
    <div id="insertModal">
        <textarea v-model="textareaValue"></textarea>
        <button v-on:click="handleInsert">Insert Word</button>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "InsertWords",
  data: () => ({
    textareaValue: ""
  }),
  computed: {
    ...mapState(["wordsApiKey", "existingWords"])
  },
  methods: {
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
      this.vocabularyDB.push({
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
  },
  props: {
    vocabularyDB: Object
  }
};
</script>

<style scoped>
#insertModal {
  width: 400px;
  height: 200px;
  position: fixed;
  left: 500px;
  z-index: 100000;
  background: #263238;
}
</style>
