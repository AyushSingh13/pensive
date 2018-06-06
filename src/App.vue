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
import { VueEditor } from "vue2-editor";

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
@import url("https://fonts.googleapis.com/css?family=Anonymous+Pro|Roboto+Mono");

html,
body {
  /* overflow: hidden; */
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Anonymous Pro", "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
  width: 100%;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 1fr 4fr;
}

vue-editor {
  max-height: 100%;
  border: none;
}

.card {
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
}

.clean-btn {
  text-decoration: none;
  border: none;
  outline: none;
  padding: 1em;
  cursor: pointer;
}

.rounded-btn {
  border-radius: 0.3em;
}

.transition-btn {
  transition: 0.2s;
}

#neg-btn:hover {
  background-color: #d63031;
  color: white;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
