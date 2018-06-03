<template>
  <div id="vocabPanel">
    <div>
      <input type="text" class="clean-btn" v-model="searchTerm" placeholder="word search..." />
      <button id="wordInsertBtn" class="clean-btn" v-on:click="this.toggleInsertModal">add new words</button>
    </div>
    <div id="emptyList" v-if="this.filteredVocabulary(this.includedInWordObj).length == 0">
      Insert new words so you can view them here while writing your masterpiece.
    </div>
    <div id="populatedList" v-else>
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
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
}

#emptyList {
  height: 100%;
  padding: 0.5em;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#populatedList {
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
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
  background-color: #b2bec3;
  transition: background-color 0.5s;
}

#wordInsertBtn:hover {
  background-color: #00b894;
}
</style>