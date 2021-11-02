<template>
  <div class="home w-full">
    <div class="bg-primary w-full h-screen flex flex-col justify-center items-center relative">
      <h1 class="text-5xl text-pink-500 mx-auto w-max font-bold">Welcome to</h1>
      <div>
        <h1 class="text-6xl text-white mx-auto w-max font-semibold">En-Gram</h1>
      </div>
      <img :src="require('@/assets/landing-graphic.png')" class="h-2/5"/>
      <div class="mt-1/4" @click="scrollDown">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
        </svg>
      </div>
    </div>
    <div class="bg-secondary">
      <img :src="require('@/assets/divider-primary.png')" alt="divider-primary" class=" max-w-screen w-full">
      <div class="w-full h-screen flex flex-col justify-center items-center space-y-28 min-h-full">
        <h1 class="text-5xl text-pink-500 mx-auto w-1/2 text-center font-bold">Take the test to find your personality type</h1>
        <div>
          <img :src="require('@/assets/test-graphic.png')"/>
        </div>
        <router-link to="/questions" class="text-5xl font-bold text-transparent bg-gradient-to-b from-green-500 to-blue-300 bg-clip-text filter hover:drop-shadow-nav">take the test</router-link>
      </div>
    </div>
    <div>
      <img :src="require('@/assets/divider-secondary.png')" alt="divider-secondary" class=" max-w-screen w-full">
      <div class=" w-full h-screen flex flex-col items-center justify-center space-y-40">
        <h1 class="text-5xl text-pink-500 mx-auto w-1/2 text-center font-bold">Register for an account to track your health.</h1>
          <div>
            <img :src="require('@/assets/track-graphic.png')"/>
        </div>
        <router-link to="/register" class="text-4xl font-bold text-transparent bg-gradient-to-b from-green-500 to-blue-300 bg-clip-text underline hover:underline">register</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Onboard",
  methods: {
    scrollDown() {
      console.log("scroll down")
    }
  }
}
</script>

<style>

</style>