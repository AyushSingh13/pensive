<template>
  <div id="docsPanel">
      <div id="emptyList" v-if="!this.documents.length">
        When you go write some stuff, you can see it saved here.
        <button v-on:click="this.saveText">Test</button>
        <button v-on:click="this.toggleMarkdownPreview">MD Preview Test</button>
      </div>
      <div id="populatedList" v-else>
          <button v-on:click="this.saveText">Test</button>
          <button v-on:click="this.toggleMarkdownPreview">MD Preview Test</button>
          <ul
            v-for="docObj in this.documents"
            v-bind:key="docObj.id"
          >
            <li>{{docObj.title}}</li>
          </ul>
      </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import { storage, documentsDbRef } from "../firebase";

export default {
  name: "DocumentSet",
  methods: {
    getTitle(text) {
      return text.split("\n")[0];
    },
    saveText() {
      let title = this.getTitle(this.textareaValue);
      console.log(this.documents);
      console.log(title);
      let textContent = new Blob(["Test save"], { type: "text/plain" });
      storage
        .ref()
        .child(title + ".md")
        .put(textContent)
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(downloadURL =>
          documentsDbRef.add({
            title: title,
            downloadURL: downloadURL
          })
        );
    },
    ...mapMutations(["toggleMarkdownPreview"])
  },
  computed: {
    ...mapState(["textareaValue", "documents"])
  }
};
</script>

<style scoped>
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
