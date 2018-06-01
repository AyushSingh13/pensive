<template>
  <div id="app">
    <insert-words
      v-if="this.isInsertModalOpen"
    />
    <VocabularySet />
    <vue-editor
      id="quillEditor"
      :editorOptions="this.editorOptions"
    >
    </vue-editor>
  </div>
</template>

<script>
import { mapState } from "vuex";
import store from "./store";

// Custom Components
import Word from "./components/Word.vue";
import VocabularySet from "./components/VocabularySet.vue";
import InsertWords from "./components/InsertWords.vue";

// Third-party Components
import { VueEditor, Quill } from "vue2-editor";

let Font = Quill.import("formats/font");
Font.whitelist = ["roboto"];
Quill.register(Font, true);

export default {
  name: "app",
  store,
  mounted() {
    this.$store.dispatch("getArrayOfAllWordsFromDB");
  },
  computed: {
    ...mapState(["isInsertModalOpen", "editorOptions"])
  },
  components: {
    Word,
    VocabularySet,
    VueEditor,
    InsertWords
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Roboto");

html,
body {
  overflow: hidden;
}

body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 1fr 4fr;
}

vue-editor {
  height: 100%;
}

.ql-font-roboto {
  font-family: "Roboto";
}
</style>
