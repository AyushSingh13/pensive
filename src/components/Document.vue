<template>
    <button v-on:click="this.handleDocumentLoad">
        {{ this.title }}
    </button>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  name: "Document",
  methods: {
    ...mapMutations(["updateMarkdownValue"]),
    handleDocumentLoad() {
      fetch(this.downloadURL, {
        "Content-Type": "text/plain"
      })
        .then(response => response.text())
        .then(docText => this.loadToEditor(docText));
    },
    loadToEditor(text) {
      this.updateMarkdownValue(text);
    }
  },
  props: {
    id: String,
    title: String,
    downloadURL: String
  }
};
</script>

<style scoped>
</style>
