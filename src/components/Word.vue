<template>
  <div id="word">
    <h3>{{ word }}</h3>
    <div v-for="def of definitions" v-bind:key="def.definition">
      <strong>{{ def.partOfSpeech }}:</strong>
      <em>{{ def.definition }}</em>
      <br /><br />
    </div>
    <button v-on:click="deleteFromDB(fbKey)">X</button>
  </div>
</template>

<script>
import { vocabularyRef } from "../firebase";

export default {
  name: "Word",
  props: {
    fbKey: String,
    word: String,
    definitions: Array
  },
  methods: {
    deleteFromDB(key) {
      vocabularyRef.child(key).remove();
    }
  }
};
</script>

<style scoped>
#word {
  border-bottom: 1px solid gray;
  padding: 0.5em;
}
</style>
