<template>
  <div id="app">
    <insert-words
      v-if="insertModalOpen"
      v-bind:apiKey="apiKey"
      v-bind:vocabularyDB="this.$firebaseRefs.vocabularyDB"
    />
    <VocabularySet
      v-bind:vocabularyDB="this.$firebaseRefs.vocabularyDB"
      v-bind:searchTerm="searchTerm"
      v-bind:toggleInsertModal="toggleInsertModal"
    />
    <vue-editor></vue-editor>
  </div>
</template>

<script>
// Firebase
import Vue from "vue";
import VueFire from "vuefire";
import firebase from "firebase";

// Custom Components
import HelloWorld from "./components/HelloWorld.vue";
import Word from "./components/Word.vue";
import VocabularySet from "./components/VocabularySet.vue";
import InsertWords from "./components/InsertWords.vue";

// Third-party Components
import { VueEditor } from "vue2-editor";

// Data
// import vocabulary from "./assets/words.json";
import configSettings from "./assets/configSettings.json";

Vue.use(VueFire);
let firebaseApp = firebase.initializeApp(configSettings.firebaseConfig);
let db = firebaseApp.database();

export default {
  name: "app",
  methods: {
    toggleInsertModal() {
      this.insertModalOpen = !this.insertModalOpen;
    }
  },
  firebase: {
    vocabularyDB: db.ref("vocabulary")
  },
  data: () => ({
    // vocab: vocabulary,
    searchTerm: "",
    insertModalOpen: false,
    apiKey: configSettings.wordsApiKey
  }),
  components: {
    HelloWorld,
    Word,
    VocabularySet,
    VueEditor,
    InsertWords
  }
};
</script>

<style>
body {
  margin: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;
  width: 100vw;
  text-align: center;
  color: #2c3e50;
  display: grid;
  grid-template-columns: 1fr 4fr;
}
</style>
