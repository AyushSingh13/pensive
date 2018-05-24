<template>
    <div id="insertModal">
        <textarea v-model="textareaValue"></textarea>
        <button v-on:click="handleInsert">Insert Word</button>
    </div>
</template>

<script>
import vocabulary from "../assets/vocabulary.json";

export default {
  name: "InsertWords",
  data: () => ({
    textareaValue: ""
  }),
  methods: {
    wordAlreadyExists(word) {
      return Object.keys(vocabulary).includes(word);
    },
    pullWordFromApi(word) {
      console.log(
        "https://wordsapiv1.p.mashape.com/words/" + word.toLowerCase()
      );
      fetch("https://wordsapiv1.p.mashape.com/words/" + word.toLowerCase(), {
        method: "GET",
        headers: {
          "X-Mashape-Key": this.apiKey,
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
      this.getNewWords(this.splitByNewline(this.textareaValue)).map(word =>
        this.pullWordFromApi(word)
      );
    }
  },
  props: {
    apiKey: String,
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
  background: black;
}
</style>
