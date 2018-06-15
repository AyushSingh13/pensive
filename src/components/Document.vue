<template>
  <div id="document-item">
    <button
      class="clean-btn transition-btn"
      id="document-load-btn"
      v-on:click="this.handleDocumentLoad"
    >
        {{ this.title }}
    </button>
    <button
      class="clean-btn transition-btn"
      id="neg-btn"
      v-on:click="this.handleDeleteDocument"
    >
      &times;
    </button>
  </div>
</template>

<script>
import { mapMutations } from "vuex";
import { storage, documentsDbRef } from "../firebase";

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
    },
    handleDeleteDocument() {
      this.deleteFromDb(this.id);
      this.deleteFromStorage(this.title + ".md");
    },
    deleteFromStorage(fileName) {
      storage
        .ref()
        .child(fileName)
        .delete()
        .then(() => console.log(`Deleted ${this.title} successfully.`))
        .catch(err =>
          console.log(
            `Error: deleting ${this.title} from STORAGE failed due to ${err}.`
          )
        );
    },
    deleteFromDb(id) {
      documentsDbRef
        .doc(id)
        .delete()
        .catch(err =>
          console.log(
            `Error: deleting ${this.title} from DB failed due to ${err}.`
          )
        );
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
#document-item {
  display: flex;
  width: 100%;
}

#document-load-btn {
  flex: 1;
}

#document-load-btn:hover {
  background-color: black;
  color: white;
}
</style>
