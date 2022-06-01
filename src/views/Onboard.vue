<template>
  <div class="home w-full">
    <div class=" relative banner bg-primary">
      <h1 class="text-5xl text-pink-500 mx-auto w-max font-bold">Welcome to</h1>
      <div>
        <h1 class="mb-20 text-6xl text-white mx-auto w-max font-semibold">En-Gram</h1>
      </div>
      <img :src="require('@/assets/landing-graphic.png')" class="logo"/>
      <div class="mt-20 cursor-pointer transform hover:translate-y-5 transition-all" @click="scrollDown">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 17l-4 4m0 0l-4-4m4 4V3" />
        </svg>
      </div>
    </div>
    <div class="bg-secondary">
      <img :src="require('@/assets/divider-primary.png')" alt="divider-primary" class=" max-w-screen w-full">
      <div class="space-y-28 banner" id="test">
        <h1 class="banner__copy">Take the test to find your personality type</h1>
        <div>
          <img :src="require('@/assets/test-graphic.png')" class="w-3/5 md:w-4/5 mx-auto"/>
        </div>
        <router-link to="/test" class="banner__link">Take the test</router-link>
      </div>
    </div>
    <div>
      <img :src="require('@/assets/divider-secondary.png')" alt="divider-secondary" class=" max-w-screen w-full">
      <div class="space-y-40 banner">
        <h1 class="banner__copy">Register for an account to track your health.</h1>
          <div>
            <img :src="require('@/assets/track-graphic.png')" class="w-3/5 md:w-full mx-auto"/>
        </div>
        <router-link to="/register" class="p-2 capitalize banner__link">register</router-link>
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
    @apply w-full h-screen flex flex-col justify-center items-center min-h-700;
  }
  .banner__link{
    @apply
      text-2xl
      md:text-4xl
      font-medium
      text-transparent
      bg-gradient-to-b
      from-green-500
      to-blue-300
      bg-clip-text
      filter
      hover:drop-shadow-md
      transition-all
    ;
  }
  .banner__copy{
    @apply text-2xl md:text-5xl text-pink-500 mx-auto w-4/5 md:w-1/2 text-center font-medium;
  }

  .logo{
    @apply
    w-3/5
    md:w-2/5
    max-w-800
    max-h-800;

    filter: drop-shadow(0 30px 8px rgb(159, 159, 159));
  }

  @media (max-width: 800px) {
    .logo{
      filter: drop-shadow(0 15px 6px rgb(159, 159, 159)) !important;
    }
}
</style>