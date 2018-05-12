<template>
  <div id="app">
    <VocabularySet
      v-bind:vocabulary="vocab"
    />
    <textarea>
    </textarea>
  </div>
</template>

<script>
// Components
import HelloWorld from "./components/HelloWorld.vue";
import Word from "./components/Word.vue";
import VocabularySet from "./components/VocabularySet.vue";

// Data
import vocabulary from "./assets/words.json";

export default {
  name: "app",
  data: () => ({
    vocab: vocabulary
  }),
  components: {
    HelloWorld,
    Word,
    VocabularySet
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
