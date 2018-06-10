<template>
    <div id="md-preview" v-html="this.compiledMarkdown"></div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "MarkdownPreview",
  computed: {
    ...mapGetters(["compiledMarkdown"])
  }
};
</script>

<style scoped>
#md-preview {
  padding: 0 1.5em;
  font-family: Helvetica, Arial, sans-serif;
}
</style>
