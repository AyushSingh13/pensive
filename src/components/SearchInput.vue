<template>
    <input type="text" class="clean-btn" v-model="searchTerm" placeholder="word search..." />    
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "SearchInput",
  methods: {
    ...mapMutations(["updateSearchTermValue"])
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
input {
  width: 100%;
  font-size: 1em;
  padding: 1em;
}
</style>
