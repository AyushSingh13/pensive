<template>
    <codemirror v-model="markdown" :options="this.codeMirrorOptions"></codemirror>
</template>

<script>
import { mapMutations, mapState } from "vuex";

// CodeMirror Core
import { codemirror } from "vue-codemirror";
import "codemirror/lib/codemirror.css";

// CodeMirror Languages
import "codemirror/mode/markdown/markdown.js";
import "codemirror/mode/javascript/javascript.js";

// CodeMirror Themes
import "codemirror/theme/base16-light.css";

export default {
  name: "MarkdownEditor",
  methods: {
    ...mapMutations(["updateMarkdownValue"])
  },
  components: {
    codemirror
  },
  computed: {
    ...mapState(["codeMirrorOptions", "markdown"]),
    markdown: {
      get() {
        return this.$store.getters.markdown;
      },
      set(updatedMarkdown) {
        this.updateMarkdownValue(updatedMarkdown);
      }
    }
  }
};
</script>

<style>
.CodeMirror {
  font-family: "Roboto Mono";
  font-size: 1.25em;
  padding: 1em;
}
</style>
