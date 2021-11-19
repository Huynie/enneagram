<template>
  <div class="home w-full">
    <div class="bg-primary w-full h-screen flex flex-col justify-center items-center relative banner landing">
      <h1 class="text-5xl text-pink-500 mx-auto w-max font-bold">Welcome to</h1>
      <div>
        <h1 class="text-6xl text-white mx-auto w-max font-semibold">En-Gram</h1>
      </div>
      <img :src="require('@/assets/landing-graphic.png')" class="w-3/5 md:w-2/5 max-w-800 max-h-800"/>
      <div class="mt-20 lg: cursor-pointer transform hover:translate-y-5 transition-all" @click="scrollDown">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
        </svg>
      </div>
    </div>
    <div class="bg-secondary">
      <img :src="require('@/assets/divider-primary.png')" alt="divider-primary" class=" max-w-screen w-full">
      <div class="w-full h-screen flex flex-col justify-center items-center space-y-28 min-h-full banner" id="test">
        <h1 class="text-2xl md:text-5xl text-pink-500 mx-auto w-4/5 md:w-1/2 text-center font-medium">Take the test to find your personality type</h1>
        <div>
          <img :src="require('@/assets/test-graphic.png')" class="w-3/5 md:w-4/5 mx-auto"/>
        </div>
        <router-link to="/test" class="text-2xl md:text-4xl font-medium text-transparent bg-gradient-to-b from-green-500 to-blue-300 bg-clip-text filter hover:drop-shadow-md transition-all">Take the test</router-link>
      </div>
    </div>
    <div>
      <img :src="require('@/assets/divider-secondary.png')" alt="divider-secondary" class=" max-w-screen w-full">
      <div class=" w-full h-screen flex flex-col items-center justify-center space-y-40 banner">
        <h1 class="text-2xl md:text-5xl text-pink-500 mx-auto w-4/5 md:w-1/2 text-center font-medium">Register for an account to track your health.</h1>
          <div>
            <img :src="require('@/assets/track-graphic.png')" class="w-3/5 md:w-full mx-auto"/>
        </div>
        <router-link to="/register" class="p-2 capitalize text-2xl md:text-4xl font-medium text-transparent bg-gradient-to-b from-green-500 to-blue-300 bg-clip-text filter hover:drop-shadow-md transition-all">register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Onboard",
  methods: {
    scrollDown() {
      const testBanner = document.querySelector('#test');
      testBanner.scrollIntoView({behavior: 'smooth'});
    }
  }
}
</script>

<style>
  .home{
    scroll-behavior: smooth;
  }
  .banner{
    min-height: 700px;
  }

  @media only screen and (max-height: 800px) {
    /* prevents landing banner from cliping into navbar at small screen height */
    .landing{
      @apply h-full;
    }
}
</style>