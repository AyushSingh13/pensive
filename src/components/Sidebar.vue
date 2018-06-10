<template>
  <div id="sidebar">
    <div id="tabs-container" style="">
      <button 
        id="vocab-btn"
        class="clean-btn"
        v-bind:class="{ 'vocab-btn-active': isVocabTabActive }"
        v-on:click="() => this.changeSidebarTab('VocabularySet')">vocabulary</button>
      <button
        id="docs-btn"
        class="clean-btn"
        v-bind:class="{ 'docs-btn-active': isDocsTabActive }"
        v-on:click="() => this.changeSidebarTab('DocumentSet')">docs</button>
    </div>
    <DocumentSet v-show="isDocsTabActive" />
    <VocabularySet v-show="isVocabTabActive" />
  </div>
</template>

<script>
import VocabularySet from "./VocabularySet.vue";
import DocumentSet from "./DocumentSet.vue";
import { mapMutations, mapState } from "vuex";

export default {
  name: "Sidebar",
  methods: {
    ...mapMutations(["changeSidebarTab"])
  },
  components: {
    VocabularySet,
    DocumentSet
  },
  computed: {
    ...mapState(["activeSidebar"]),
    isDocsTabActive() {
      return this.activeSidebar == "DocumentSet";
    },
    isVocabTabActive() {
      return this.activeSidebar == "VocabularySet";
    }
  }
};
</script>

<style scoped>
#tabs-container {
  display: flex;
}

#docs-btn,
#vocab-btn {
  transition: all 0.2s;
  flex: 1;
}

#docs-btn:hover,
.docs-btn-active {
  color: white;
  background-color: #0984e3;
}

#vocab-btn:hover,
.vocab-btn-active {
  color: white;
  background-color: #a29bfe;
}

#sidebar {
  display: grid;
  grid-template-rows: 1fr 19fr;
  width: 100%;
  max-height: 100%;
}
</style>

