<template>
    <div id="signin-page">
        <button v-on:click="handleSignIn('google')">Sign-in with Google</button>
        <button v-on:click="handleSignIn('github')">Sign-in with GitHub</button>
    </div>    
</template>


<script>
import { firebaseAuth } from "../firebase";
import { mapState, mapMutations } from "vuex";

let providers = {
  google: new firebaseAuth.GoogleAuthProvider(),
  github: new firebaseAuth.GithubAuthProvider()
};

export default {
  name: "SignIn",
  mounted() {
    console.log(new firebaseAuth.GoogleAuthProvider());
  },
  computed: {
    ...mapState(["isSignedIn"])
  },
  methods: {
    ...mapMutations(["toggleSignInState"]),
    handleSignIn(accountType) {
      firebaseAuth()
        .signInWithPopup(this.getProvider(accountType))
        .then(result => {
          this.toggleSignInState();
          console.log(`Signed in as ${result.user}`);
        })
        .catch(error => console.log(`Error: ${error.message}.`));
    },
    getProvider(accountType) {
      return providers[accountType];
    }
  }
};
</script>

<style scoped>
#signin-page {
  display: flex;
  height: 100%;
  width: 100%;
}
</style>

