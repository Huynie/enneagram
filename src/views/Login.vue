<template>
  <div class="mx-auto w-80 mt-10 h-screen">
    <h1 class="text-lg mx-auto w-max">Login</h1>
    <div class="flex flex-col my-2">
        <label>username</label>
        <input type="email" v-model="email" placeholder="enter email" class="rounded-sm border-2 border-gray-100"/>
    </div>
    <div class="flex flex-col my-2">
        <label>password</label>
        <input type="password" v-model="password" placeholder="enter password" class="rounded-sm border-2 border-gray-100"/>
    </div>
    <div class="mb-5 font-normal">
        <div class="text-center text-gray-400">
            Forgot your password?
            <router-link :to="{ name: 'ForgotPassword' }" class="hover:text-pink-400 font-medium">Click here.</router-link>
        </div>
        <div class="text-center  text-gray-400">
            Don't have an account? 
            <router-link :to="{ name: 'Register' }" class="hover:text-pink-400 font-medium">Register here.</router-link>
        </div>
    </div>
    <div v-show="error">
        {{this.errorMsg}}
    </div>
    <div class="px-8">
        <Button
            tailwindClass="btn-login"
            text="Sign In"
            @click.prevent="login"
        />
        <Button
            tailwindClass=" bg-red-500 w-full font-semibold"
            text="Sign In With Google"
            @click.prevent="signInWithGoogle"
        />
        <Button
            tailwindClass="w-full bg-blue-500 font-semibold"
            text="Sign In With Facebook"
            @click.prevent="signInWithFacebook"
        />
        <Button
            tailwindClass="bg-black font-semibold w-full"
            text="Sign In With Github"
            @click.prevent="signInWithGithub"
        />
    </div>
    <!-- <div>
        <section id="firebaseui-auth-container"></section>
    </div> -->
  </div>
</template>

<script>
import Button from '../components/Button';
import { auth } from '../firebase/firebaseInit';
import {
    signInWithEmailAndPassword,
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
    name: 'Login',
    components: {
        Button
    },
    data () {
        return {
            email: "",
            password: "",
            error: null,
            errorMsg: ""
        }
    },
    methods: {
        // Maybe move to VueX store?
        async login() {
            try{
                await signInWithEmailAndPassword(auth, this.email, this.password);
                this.error = false;
                this.errorMsg = "";
                this.$router.go('/dashboard');
            } catch (error) {
                this.error = true;
                this.errorMsg = error;
            }
        },
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
.btn-login{
    @apply
        bg-primary
        mx-auto
        w-full
        outline-none
        focus:bg-pressed
        focus:ring-pink-400
        focus:ring-2
        focus:outline-none
        hover:bg-questions
        font-semibold
    ;
}
</style>