<template>
  <div>
    <div>
      <input type="text" class="formControls" v-model="searchTerm" placeholder="Word search..." />
      <button id="wordInsertBtn" class="formControls" v-on:click="this.toggleInsertModal">Insert Words</button>
    </div>
    <div id="vocabPanel">
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
  width: 100%;
  max-height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}

.formControls {
  outline: none;
  border: none;
}

input {
  width: 100%;
  font-size: 1em;
  padding: 1em;
}

#wordInsertBtn {
  width: 100%;
  font-size: 1em;
  height: 3em;
  color: white;
  background-color: #263238;
}
</style>