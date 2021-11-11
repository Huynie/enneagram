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
    <div class="px-8">
        <Button
            tailwindClass="btn-login"
            text="Login"
            @click.prevent="login"
        />
    </div>
    <div v-show="error">
        {{this.errorMsg}}
    </div>
  </div>
</template>

<script>
import Button from '../components/Button';
import { auth } from '../firebase/firebaseInit';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default {
    name: 'Login',
    components: {
        Button
    },
    data () {
        return {
            email: "test@test.com",
            password: "test123",
            error: null,
            errorMsg: ""
        }
    },
    methods: {
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
    }
}
</script>

<style scroped>
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
    ;
}
</style>