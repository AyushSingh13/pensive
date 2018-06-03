<template>
  <div>
    <div>
      <input type="text" class="clean-btn" v-model="searchTerm" placeholder="word search..." />
      <button id="wordInsertBtn" class="clean-btn" v-on:click="this.toggleInsertModal">insert new words</button>
    </div>
    <div id="emptyVocabPanel" v-if="this.filteredVocabulary(this.includedInWordObj).length == 0">
      <p>Insert new words so you can view them here while writing your masterpiece.</p>
    </div>
    <div id="vocabPanel" v-else>
      <div
        v-for="wordObj of this.filteredVocabulary(this.includedInWordObj)"
        v-bind:key="wordObj.key"
        id="vocabResults"
      >
        <Word
          v-bind:fbKey="wordObj.key"
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

#emptyVocabPanel {
  width: 100%;
  max-height: 100vh;
  display: flex;
  flex-direction: row;
  align-content: center;
  justify-content: center;
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
  background-color: #fad390;
  transition: background-color 0.5s;
}

#wordInsertBtn:hover {
  background-color: #f8c291;
}

#wordInsertBtn:active {
  background-color: #f6b93b;
}
</style>