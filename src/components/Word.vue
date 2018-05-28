<template>
  <div id="word">
    <h3>{{ word }}</h3>
    <div v-for="def of definitions" v-bind:key="def.definition">
      <strong>{{ def.partOfSpeech }}:</strong>
      <em>{{ def.definition }}</em>
      <br /><br />
    </div>
  </div>
</template>

<script>
export default {
  name: "Word",
  props: {
    word: String,
    definitions: Array
  }
};
</script>

<style scoped>
#word {
  border-bottom: 1px solid gray;
  padding: 0.5em;
}
</style>
