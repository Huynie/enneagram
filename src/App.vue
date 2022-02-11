<template>
  <div class="app">
    <!-- :key is to re-render Nav everytime route changes -->
    <Nav :key="$route.fullPath"/>
    <router-view />
    <Footer/>
  </div>
</template>

<script>
import Nav from './components/Nav';
import Footer from './components/Footer';
// import { auth } from './firebase/firebaseInit';
// import { onAuthStateChanged } from 'firebase/auth';

export default {
  name: 'App',
  components: {
    Nav,
    Footer
  }
}
</script>

<style src="./assets/tailwind.css">
  @import url('https://fonts.googleapis.com/css2?family=Work+Sans:wght@100;200;300;400;500;600;700;800;900&display=swap');

  html, body {
    font-family: 'Work Sans', sans-serif;
  }
</style>