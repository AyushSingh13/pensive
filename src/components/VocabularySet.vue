<template>
  <div
    overflow="auto"
    id=""
  >
      <input type="text" v-model="searchTerm" placeholder="Search..." />
      <div
        v-for="word of filteredVocabulary"
        v-bind:key="word"
      >
        <Word
          v-bind:word="word"
          v-bind:definition="vocabulary[word].definition"
          v-bind:etymology="vocabulary[word].etymology"
       />
    </div>
  </div>
</template>

<script>
import Word from "./Word.vue";

export default {
  name: "VocabularySet",
  methods: {
    includedInWord(word) {
      return word.toLowerCase().includes(this.searchTerm.toLowerCase());
    }
  },
  props: {
    vocabulary: Object,
    searchTerm: String
  },
  components: {
    Word
  },
  computed: {
    filteredVocabulary() {
      return Object.keys(this.vocabulary).filter(this.includedInWord);
    }
  }
};
</script>

<style scoped>
input {
  width: 90%;
}
</style>