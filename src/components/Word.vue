<template>
  <div id="word">
    <h3>{{ word }}</h3>
    <p><em>{{ definition }}</em></p>
    <ul>
      <li
        v-for="(meaning, root) in etymology"
        v-bind:key="meaning"
      >
        <strong>{{ root }}: </strong><em>{{ meaning }}</em>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Word",
  props: {
    word: String,
    definition: String,
    etymology: Object
  }
};
</script>

<style scoped>

</style>
