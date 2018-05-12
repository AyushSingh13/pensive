<template>
  <div
    overflow="auto"
    id=""
  >
      <input type="text" placeholder="Search..." />
      <div
        v-for="(wordProps, word) of vocabulary"
        v-bind:key="wordProps.definition"
      >
        <Word
          v-bind:word="word"
          v-bind:definition="wordProps.definition"
          v-bind:etymology="wordProps.etymology"
       />
    </div>
  </div>
</template>

<script>
import Word from "./Word.vue";

export default {
  name: "VocabularySet",
  props: {
    vocabulary: Object
  },
  components: {
    Word
  }
};
</script>

<style scoped>

</style>