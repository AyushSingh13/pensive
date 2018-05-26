<template>
  <div
    id="vocabPanel"
  >
      <input type="text" v-model="searchTerm" placeholder="Search words" />
      <button v-on:click="this.toggleInsertModal">Insert</button>
      <div
        v-for="wordObj of this.filteredVocabulary(this.includedInWordObj)"
        v-bind:key="wordObj.word"
        id="vocabResults"
      >
        <Word
          v-bind:word="wordObj.word"
          v-bind:definitions="wordObj.definitions"
       />
    </div>
  </div>
</template>

<script>
import Word from "./Word.vue";
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "VocabularySet",
  methods: {
    ...mapMutations(["toggleInsertModal", "updateSearchTermValue"]),
    includedInWord(word) {
      return word.toLowerCase().includes(this.searchTerm.toLowerCase());
    },
    includedInWordObj(wordObj) {
      // TODO: Add includedInDefinitions(wordObj.definitions)
      return this.includedInWord(wordObj.word);
    }
  },
  props: {
    vocabularyDB: Object
  },
  components: {
    Word
  },
  computed: {
    searchTerm: {
      get() {
        return this.$store.getters.searchTerm;
      },
      set(newSearchValue) {
        this.updateSearchTermValue(newSearchValue);
      }
    },
    ...mapGetters(["filteredVocabulary"])
  }
};
</script>

<style scoped>
#vocabPanel {
  max-height: 100vh;
  overflow: auto;
}

input {
  width: 90%;
}
</style>