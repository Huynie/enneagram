<template>
  <div>
      <Button
        tailwindClass=" bg-red-500 w-full font-semibold"
        text="Continue With Google"
        @click.prevent="signInWithGoogle"
      />
      <Button
        tailwindClass="w-full bg-blue-500 font-semibold"
        text="Continue With Facebook"
        @click.prevent="signInWithFacebook"
      />
      <Button
        tailwindClass="bg-black font-semibold w-full"
        text="Continue With Github"
        @click.prevent="signInWithGithub"
      />
    <!-- <div>
      <section id="firebaseui-auth-container"></section>
    </div> -->
  </div>
</template>

<script>
import Button from './Button.vue';
import { auth } from '../firebase/firebaseInit';
import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider,
    // TwitterAuthProvider
} from 'firebase/auth';
// import * as firebaseui from 'firebaseui';
// import 'firebaseui/dist/firebaseui.css'
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth';

export default {
  name: "OauthButtons",
  components: {
    Button,
  },
  methods:{
    async signInWithGoogle() {
      await signInWithPopup(auth, new GoogleAuthProvider())
        .then((res) => {
            console.log(res);
            this.$router.go('/dashboard');
        })
        .catch((err) => {
            console.log(err);
        })
            // try {
            //     signInWithPopup(auth, new GoogleAuthProvider());
            //     this.error = false;
            //     this.errorMsg = "";
            //     this.$router.go('/dashboard');
            // } catch (error) {
            //     this.error = true;
            //     this.errorMsg = error;
            // }
    },
    async signInWithFacebook() {
      // Maybe use SignInWithRedirect to link FB & Google credential togethe?
        try {
            const res = await signInWithPopup(auth, new FacebookAuthProvider())
            ;
            console.log(res);
            this.error = false;
            this.errorMsg = "";
            this.$router.go('/dashboard');
        } catch (error) {
            this.error = true;
            this.errorMsg = error;
            console.log(error)
        }
    },
    async signInWithGithub() {
        try {
            await signInWithPopup(auth, new GithubAuthProvider());
            this.error = false;
            this.errorMsg = "";
            this.$router.go('/dashboard');
        } catch (error) {
            this.error = true;
            this.errorMsg = error;
            console.log(error)
        }
    },
  },
    // mounted() {
    //     console.log(firebase.auth)
    //     const uiConfig = {
    //         signInSuccessUrl: "/profile",
    //         signInOptions: [
    //             firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    //             firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    //             firebase.auth.GithubAuthProvider.PROVIDER_ID,
    //         ]
    //     };
    //     const ui = new firebaseui.auth.AuthUI(auth);
    //     ui.start("#firebaseui-auth-container", uiConfig);
    // }
}
</script>

<style>

</style>