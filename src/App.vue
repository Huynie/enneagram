<template>
  <div class="app">
    <!-- :key is to re-render Nav everytime route changes -->
    <Nav :key="$route.fullPath"/>
    <router-view />
  </div>
</template>

<script>
import Nav from './components/Nav';
import { auth } from './firebase/firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'App',
  components: {
    Nav
  },
  // created() {
    // console.log(auth.currentUser.uid);
    // onAuthStateChanged(auth, (user) => {
    //   this.$store.commit("updateUser", user);
    //   if(user) {
    //     this.$store.dispatch("getCurrentUser");
    //   }
    // })
    // this.checkRoute();
  // }
}
</script>

<style src="./assets/tailwind.css"/>