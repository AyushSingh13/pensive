<template>
  <div id="sidebar">
    <div style="display: flex; background-color: black; height: auto">
      <button 
        id="vocab-btn"
        style="flex: 1"
        class="clean-btn"
        v-bind:class="{ 'vocab-btn-active': isVocabTabActive }"
        v-on:click="() => this.changeSidebarTab('VocabularySet')">vocabulary</button>
      <button
        id="docs-btn"
        style="flex: 1"
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
#docs-btn,
#vocab-btn {
  transition: all 0.3s;
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

