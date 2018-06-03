<template>
  <div id="word">
    <h3>{{ word }} <button id="neg-btn" class="clean-btn rounded-btn transition-btn" v-on:click="deleteFromDB(fbKey)">&times;</button></h3>
    <div v-for="def of definitions" v-bind:key="def.definition">
      <strong>{{ def.partOfSpeech }}:</strong>
      <em>{{ def.definition }}</em>
      <br /><br />
    </div>
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
  border: 0.1px solid #b2bec3;
  padding: 0.5em;
  margin: 0.3em;
  border-radius: 0.3em;
}
</style>
