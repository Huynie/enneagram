<template>
  <div class="mx-auto w-80 mt-10 h-screen">
    <h1 class="title">Login</h1>
    <div class="flex flex-col my-2">
        <label>Email</label>
        <input type="email" v-model="email" placeholder="enter email" class="rounded-sm border-2 border-gray-100"/>
    </div>
    <div class="flex flex-col my-2">
        <label>Password</label>
        <input type="password" v-model="password" placeholder="enter password" class="rounded-sm border-2 border-gray-100"/>
    </div>
    <div class="mb-5 ">
        <div class="text-center text-gray-400 font-normal">
            Forgot your password?
            <router-link :to="{ name: 'ForgotPassword' }" class="hover:text-pink-400 font-semibold">Click here.</router-link>
        </div>
        <div class="text-center  text-gray-400 font-normal">
            Don't have an account? 
            <router-link :to="{ name: 'Register' }" class="hover:text-pink-400 font-semibold">Register here.</router-link>
        </div>
    </div>
    <div v-show="error">
        {{this.errorMsg}}
    </div>
    <div>
        <Button
            tailwindClass="btn-login"
            text="Log In"
            @click.prevent="login"
        />
    </div>
   <OauthButtons/>
  </div>
</template>

<script>
import Button from '../components/Button';
import OauthButtons from '../components/OauthButtons';
import { auth } from '../firebase/firebaseInit';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
    name: 'Login',
    components: {
        Button,
        OauthButtons
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
        }
    },
}
</script>

<style scope>
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
    .title{
        @apply
            w-max
            mx-auto
            text-4xl
            py-5 font-medium
            text-transparent
            bg-gradient-to-b
            from-green-500
            to-blue-300
            bg-clip-text
        ;
    }
</style>