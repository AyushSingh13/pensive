<template>
  <div id="docsPanel">
      <div id="editor-controls">
        <button id="save-btn" v-on:click="this.saveText" class="clean-btn">save</button>
        <button id="preview-btn" v-on:click="this.toggleMarkdownPreview" class="clean-btn">
          {{(this.isMarkdownPreviewMode) ? "editor" : "preview"}}
        </button>
      </div>
      <div id="emptyList" v-if="!this.documents.length">
        When you go write some stuff, you can see it saved here.
      </div>
      <div id="populatedList" v-else>
          <!-- <ul
            v-for="docObj in this.documents"
            v-bind:key="docObj.id"
          >
            <li>{{docObj.title}}</li>
          </ul> -->
          <div
            v-for="docObj in this.documents"
            v-bind:key="docObj.id"
          >
            <Document 
              v-bind:key="docObj.id"
              v-bind:title="docObj.title"
              v-bind:downloadURL="docObj.downloadURL"
            />
          </div>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from "vuex";
import { storage, documentsDbRef } from "../firebase";

import Document from "./Document.vue";

export default {
  name: "DocumentSet",
  methods: {
    getTitle: text => text.split("\n").filter(s => s != "")[0],
    saveText() {
      storage
        .ref()
        .child(this.getTitle(this.markdown) + ".md")
        .put(
          new Blob([this.markdown], {
            type: "text/plain"
          })
        )
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(downloadURL =>
          documentsDbRef.add({
            title: this.getTitle(this.markdown),
            downloadURL: downloadURL
          })
        );
    },
    ...mapMutations(["toggleMarkdownPreview"])
  },
  computed: {
    ...mapState([
      "textareaValue",
      "documents",
      "markdown",
      "isMarkdownPreviewMode"
    ]),
    ...mapGetters(["compiledMarkdown"])
  },
  components: {
    Document
  }
};
</script>

<style scoped>
#editor-controls {
  display: flex;
}

#save-btn,
#preview-btn {
  flex: 1;
  transition: all 0.2s;
}

#save-btn:hover {
  color: white;
  background-color: #2d3436;
}

#preview-btn:hover {
  color: white;
  background-color: #00b894;
}

#docsPanel {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-height: 100%;
}

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
