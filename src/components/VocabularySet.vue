<template>
    <div id="emptyList" v-if="!this.filteredVocabulary(this.includedInWordObj).length">
      Insert new words so you can view them here while writing your masterpiece.
    </div>
    <div id="populatedList" v-else>
      <div
        v-for="wordObj in this.filteredVocabulary(this.includedInWordObj)"
        v-bind:key="wordObj.id"
      >
        <Word
          v-bind:id="wordObj.id"
          v-bind:word="wordObj.word"
          v-bind:definitions="wordObj.definitions"
        />
      </div>
    </div>
</template>

<script>
import Word from "./Word.vue";
import { mapGetters, mapState } from "vuex";

export default {
  name: "VocabularySet",
  methods: {
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
    ...mapState(["searchTerm"]),
    ...mapGetters(["filteredVocabulary"])
  }
};
</script>

<style scoped>
#emptyList {
  max-height: 100%;
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
</style>