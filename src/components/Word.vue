<template>
  <div id="wordCard">
    <div v-on:click="this.toggleExpandWord" id="label" class="clean-btn">
      <h3> {{ word }} </h3>
      <button id="neg-btn" class="clean-btn rounded-btn transition-btn" v-on:click="deleteFromDB(id)">&times;</button>
    </div>
    <div v-if="this.isExpanded" id="content">
      <div v-for="def of definitions" v-bind:key="def.definition">
        <strong>{{ def.partOfSpeech }}:</strong>
        <em>{{ def.definition }}</em>
        <br /><br />
      </div>
    </div>
  </div>
</template>

<script>
import { vocabularyRef } from "../firebase";

export default {
  name: "Word",
  data: () => ({
    isExpanded: false
  }),
  props: {
    id: String,
    word: String,
    definitions: Array
  },
  methods: {
    deleteFromDB(id) {
      vocabularyRef
        .doc(id)
        .delete()
        .catch(err =>
          console.log(
            `WordDeleteError: Couldn't delete ${this.word} due to ${err}`
          )
        );
    },
    toggleExpandWord() {
      this.isExpanded = !this.isExpanded;
    }
  }
};
</script>

<style scoped>
div {
  margin: 0;
  padding: 0;
}

#label {
  display: flex;
  justify-content: space-between;
}

#content {
  transition: max-height 4s ease-out;
}

#wordCard {
  border: 0.1px solid #b2bec3;
  padding: 0.5em;
  margin: 0.3em;
  border-radius: 0.3em;
  transition: height 4s ease-out;
}
</style>
