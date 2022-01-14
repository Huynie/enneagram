<template>
  <div class="text-center">
    <h1 class="font-medium text-gray-500">or continue with</h1>
    <div class="flex space-x-5">
      <Button
        tailwindClass=" bg-gray-100 hover:bg-gray-200 w-full font-semibold"
        @click.prevent="signInWith('google')"
      >
        <svg class="h-8 mx-auto" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>Google</title>
        <path fill="#C71D23" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/></svg>
      </Button>
      <Button
        tailwindClass="w-full bg-gray-100 hover:bg-gray-200 font-semibold"
        @click.prevent="signInWith('facebook')"
      >
        <svg class="h-8 mx-auto" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" >
          <title>Facebook</title>
          <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </Button>
      <Button
        tailwindClass="bg-gray-100 hover:bg-gray-200 font-semibold w-full"
        @click.prevent="signInWith('github')"
      >
        <svg class="h-8 mx-auto" role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <title>GitHub</title>
        <path fill="black" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>
      </Button>
    </div>
    <!-- <div>
      <section id="firebaseui-auth-container"></section>
    </div> -->
  </div>
</template>

<script>
import Button from './Button.vue';
import db, { auth } from '../firebase/firebaseInit';
import {
    signInWithPopup,
    GoogleAuthProvider,
    GithubAuthProvider,
    FacebookAuthProvider,
    // TwitterAuthProvider
    fetchSignInMethodsForEmail,
    signInWithEmailAndPassword,
    linkWithCredential,
    linkAndRetrieveDataWithCredential
} from 'firebase/auth';
import { setDoc, doc, getDoc} from 'firebase/firestore/lite';
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
    async signInWith(company) {
      let provider;
      switch(company) {
        case 'google':
          provider =  GoogleAuthProvider;
          break;
        case 'facebook':
          provider =  FacebookAuthProvider;
          break;
        case 'github':
          provider =  GithubAuthProvider;
          break;
        default:
          provider =  GoogleAuthProvider;
          break;
      }

      // const provider = 
      //   company === "google" ? new GoogleAuthProvider()
      //   : company === "facebook" ? new FacebookAuthProvider()
      //   : company === "github" ? new GithubAuthProvider();


      try {
        const res = await signInWithPopup(auth, new provider() );
        console.log(res);
        const docRef = doc(db, "users", res.user.uid);
        const docSnap = await getDoc(docRef);

        if(!docSnap.exists()) {
          const userData = {
            firstName: res.user.displayName,
            lastName: res.user.displayName,
            userName: res.user.displayName,
            email: res.user.email,
            results: [],
          };
          // create new doc in Firebase Firestore database
          await setDoc( docRef, userData );
        }
        this.error = false;
        this.errorMsg = "";
        this.$router.go('/dashboard');
      } catch (error) {
        this.error = true;
        this.errorMsg = error;
        console.log(error.code, provider.credentialFromError(error));
          // TO DO: Link providers to same email
        // if (error.code === 'auth/account-exists-with-different-credential') {
        //   // Step 2.
        //   // User's email already exists.
        //   // The pending Google credential.
        //   var pendingCred = error.credential;
        //   // The provider account's email address.
        //   var email = error.email;
        //   // Get sign-in methods for this email.
        //   fetchSignInMethodsForEmail(email).then(function(methods) {
        //     // Step 3.
        //     // If the user has several sign-in methods,
        //     // the first method in the list will be the "recommended" method to use.
        //     if (methods[0] === 'password') {
        //       // Asks the user their password.
        //       // In real scenario, you should handle this asynchronously.
        //       var password = promptUserForPassword(); // TODO: implement promptUserForPassword.
        //       signInWithEmailAndPassword(email, password).then(function(result) {
        //         // Step 4a.
        //         return linkWithCredential(pendingCred);
        //       }).then(function() {
        //         // Google account successfully linked to the existing Firebase user.
        //         goToApp();
        //       });
        //       return;
        //     }
        //     // All the other cases are external providers.
        //     // Construct provider object for that provider.
        //     // TODO: implement getProviderForProviderId.
        //     var provider = getProviderForProviderId(methods[0]);
        //     // At this point, you should let the user know that they already have an account
        //     // but with a different provider, and let them validate the fact they want to
        //     // sign in with this provider.
        //     // Sign in to provider. Note: browsers usually block popup triggered asynchronously,
        //     // so in real scenario you should ask the user to click on a "continue" button
        //     // that will trigger the signInWithPopup.
        //     signInWithPopup(provider).then(function(result) {
        //       // Remember that the user may have signed in with an account that has a different email
        //       // address than the first one. This can happen as Firebase doesn't control the provider's
        //       // sign in flow and the user is free to login using whichever account they own.
        //       // Step 4b.
        //       // Link to Google credential.
        //       // As we have access to the pending credential, we can directly call the link method.
        //       linkAndRetrieveDataWithCredential(pendingCred).then(function(usercred) {
        //         // Google account successfully linked to the existing Firebase user.
        //         goToApp();
        //       });
        //     });
        //   });
        // }

      }
    }
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