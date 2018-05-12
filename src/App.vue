<template>
  <div id="app">
    <VocabularySet
      v-bind:vocabulary="vocab"
      v-bind:searchTerm="searchTerm"
    />
    <vue-editor></vue-editor>
  </div>
</template>

<script>
// Components
import HelloWorld from "./components/HelloWorld.vue";
import Word from "./components/Word.vue";
import VocabularySet from "./components/VocabularySet.vue";
import { VueEditor } from "vue2-editor";

// Data
import vocabulary from "./assets/words.json";

export default {
  name: "app",
  data: () => ({
    vocab: vocabulary,
    searchTerm: ""
  }),
  components: {
    HelloWorld,
    Word,
    VocabularySet,
    VueEditor
  }
};

console.log(vocabulary);
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
