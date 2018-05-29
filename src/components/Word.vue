<template>
  <div id="word">
    <h3>{{ word }}</h3>
    <div v-for="def of definitions" v-bind:key="def.definition">
      <strong>{{ def.partOfSpeech }}:</strong>
      <em>{{ def.definition }}</em>
      <br /><br />
    </div>
    <button v-on:click="deleteFromDB">X</button>
  </div>
</template>

<script>
export default {
  name: "Word",
  props: {
    fbKey: String,
    word: String,
    definitions: Array
  },
  methods: {
    deleteFromDB() {
      // TODO: Find a less hacky way of doing this
      this.$parent.$parent.$firebaseRefs.vocabularyDB
        .child(this.fbKey)
        .remove();
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
