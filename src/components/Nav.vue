<template>
  <nav class="bg-primary uppercase text-white font-bold text-xl">
      <div class="nav-desktop flex p-5">
        <div class="flex-1 ">
            <router-link to="/">EN-GRAM</router-link>
        </div>
        <ul class="flex flex-1 justify-end space-x-5 mr-5">
            <li >
                <router-link to="/test" class="filter hover:drop-shadow-nav">test</router-link>
            </li>
            <li v-show="dashboard" >
                <router-link to="/dashboard" class="filter hover:drop-shadow-nav">dashboard</router-link>
            </li>
            <li v-show="!loggedIn" >
                <router-link to="/login" class="filter hover:drop-shadow-nav">login</router-link>
            </li>
            <li v-show="loggedIn ? !dashboard : dashboard"  @click="signOut">
                <p class="filter hover:drop-shadow-nav cursor-pointer">sign-out</p>
            </li>
        </ul>
      </div>
      <div class="nav-mobile p-5" :mq="600">
        <div class="text-center">
            <router-link to="/">EN-GRAM</router-link>
            <button @click="toggle" class="absolute right-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
        </div>
        <div v-show="showMenu" class="nav__menu-mobile flex flex-col items-center">
            <button @click="toggle" class="absolute right-0 top-5">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
            </button>
            <ul class=" space-y-5 text-center mt-20">
                <li >
                    <router-link to="/test" class="filter hover:drop-shadow-nav">test</router-link>
                </li>
                <li v-show="dashboard" >
                    <router-link to="/dashboard" class="filter hover:drop-shadow-nav">dashboard</router-link>
                </li>
                <li v-show="!loggedIn" >
                    <router-link to="/login" class="filter hover:drop-shadow-nav">login</router-link>
                </li>
                <li v-show="loggedIn ? !dashboard : dashboard"  @click="signOut">
                    <p class="filter hover:drop-shadow-nav cursor-pointer">sign-out</p>
                </li>
            </ul>
        </div>
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
            showMenu: false
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
        },
        toggle() {
            this.showMenu = !this.showMenu;
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

<style scoped>
    .nav-mobile{
        display: none;
    }
    .nav__menu-mobile{
        height: 100vh;
        width: 100%;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 51;
        @apply
            bg-primary
            ;
    }
    @media only screen and (max-width: 600px) {
        .nav-desktop{
            display: none;
        }
        .nav-mobile{
            display: block;
        }
    }

</style>