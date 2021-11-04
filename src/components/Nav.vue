<template>
  <nav class="bg-primary uppercase text-white font-bold text-xl">
      <div class="nav--desktop flex p-5">
        <div class="flex-1 ">
            <router-link to="/">EN-GRAM</router-link>
        </div>
        <ul class="flex flex-1 justify-end space-x-5 mr-5">
            <li class="">
                <router-link to="/test" class="filter hover:drop-shadow-nav">test</router-link>
            </li>
            <li v-show="dashboard" class="">
                <router-link to="/dashboard" class="filter hover:drop-shadow-nav">dashboard</router-link>
            </li>
            <li v-show="!loggedIn" class="">
                <router-link to="/login" class="filter hover:drop-shadow-nav">login</router-link>
            </li>
            <li v-show="loggedIn ? !dashboard : dashboard" class="" @click="signOut">
                <p class="filter hover:drop-shadow-nav cursor-pointer">sign-out</p>
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