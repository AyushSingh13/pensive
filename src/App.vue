<template>
  <div id="app">
    <insert-words
      v-if="this.isInsertModalOpen"
      v-bind:vocabularyDB="this.$firebaseRefs.vocabularyDB"
    />
    <VocabularySet
      v-bind:vocabularyDB="this.$firebaseRefs.vocabularyDB"
    />
    <vue-editor
      :editorOptions="this.editorOptions"
    >
    </vue-editor>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import store from "./store";

// Firebase
import VueFire from "vuefire";
import firebase from "firebase/app";
import "firebase/database";

// Custom Components
import Word from "./components/Word.vue";
import VocabularySet from "./components/VocabularySet.vue";
import InsertWords from "./components/InsertWords.vue";

// Third-party Components
import { VueEditor } from "vue2-editor";

// Settings
import configSettings from "./assets/configSettings.json";

Vue.use(VueFire);

let firebaseApp = firebase.initializeApp(configSettings.firebaseConfig);
let db = firebaseApp.database();

export default {
  name: "app",
  store,
  mounted() {
    this.$store.dispatch("getArrayOfAllWordsFromDB", {
      db: this.$firebaseRefs.vocabularyDB
    });
  },
  computed: {
    ...mapState(["isInsertModalOpen", "editorOptions"])
  },
  firebase: {
    vocabularyDB: db.ref("vocabulary")
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
</style>
