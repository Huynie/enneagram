<template>
  <div class="mx-auto w-80 mt-10">
    <h1 class="text-lg mx-auto w-max">Login</h1>
    <div class="flex flex-col my-2">
        <label>username</label>
        <input type="email" v-model="email" placeholder="enter email" class="rounded-sm border-2 border-gray-100"/>
    </div>
    <div class="flex flex-col my-2">
        <label>password</label>
        <input type="password" v-model="password" placeholder="enter password" class="rounded-sm border-2 border-gray-100"/>
    </div>
    <div class="mb-5">
        <div class="text-center hover:text-blue-500 text-gray-400">
            <router-link :to="{ name: 'ForgotPassword' }">
                Forgot your password? Click here.
            </router-link>
        </div>
        <div class="text-center hover:text-blue-500 text-gray-400">
            <router-link :to="{ name: 'Register' }">
                Don't have an account? Register here.
            </router-link>
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
        login() {
            signInWithEmailAndPassword(auth, this.email, this.password)
                .then(() => {
                    this.error = false;
                    this.errorMsg = "";
                    this.$router.go({ path: this.$router.path});
                }).catch(err => {
                    this.error = true;
                    this.errorMsg = err.message;
                })
        }
    }
}
</script>

<style scroped>
.btn-login{
    @apply
        bg-blue-500
        mx-auto
        w-full
        outline-none
        focus:bg-blue-700
        focus:ring-blue-300
        focus:ring-8
        focus:outline-none
    ;
}
</style>