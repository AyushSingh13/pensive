<template>
  <div id="word">
    <h3>{{ word }}</h3>
    <p><em>{{ definition }}</em></p>
  </div>
</template>

<script>
export default {
  name: "Word",
  props: {
    word: String,
    definition: Array
  }
};
</script>

<style scoped>
#word {
  border-bottom: 1px solid gray;
}
</style>
