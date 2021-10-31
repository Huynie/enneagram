<template>
  <nav class="bg-green-300 uppercase">
      <div class="nav--desktop flex p-5">
        <div class="flex-1 hover:text-green-500">
            <router-link to="/">EN-GRAM</router-link>
        </div>
        <ul class="flex flex-1 justify-end space-x-5 mr-5">
            <li class="hover:text-green-500">
                <router-link to="/questions">test</router-link>
            </li>
            <li v-show="dashboard" class="hover:text-green-500">
                <router-link to="/dashboard">dashboard</router-link>
            </li>
            <li v-show="!loggedIn" class="hover:text-green-500">
                <router-link to="/login">login</router-link>
            </li>
            <li v-show="loggedIn ? !dashboard : dashboard" class="hover:text-green-500" @click="signOut">
                <p>sign-out</p>
            </li>
        </ul>
      </div>
      <div class="nav--mobile">

      </div>
  </nav>
</template>

<script>
import { auth } from '../firebase/firebaseInit';
import { signOut } from 'firebase/auth'

export default {
    name: "Nav",
    data () {
        return {
            dashboard: null,
            loggedIn: null,
        }
    },
    methods:{
        async signOut() {
            try{
                await signOut(auth);
                this.$router.go('/login');
            } catch (err) {
                console.error(err);
            }
        }
    },
    created() {
        const user = auth.currentUser;
        const currentURL = window.location.pathname;
        if(user) {
            this.loggedIn = true;
            this.dashboard = true;
            if (currentURL === "/dashboard") {
                this.dashboard = false;
            }
        }else {
            this.dashboard = false;
            this.loggedIn = false;
        }
    }
}
</script>

<style>

</style>