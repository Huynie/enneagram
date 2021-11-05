<template>
    <div class="resultsContainer">
        <p class="text-gray-400 w-96 mx-auto" v-show="showRegister">
            <router-link :to="{ name: 'Register' }" class="font-medium hover:text-pink-500">Register</router-link>
             for an account to save your result.  Result will reset otherwise.</p>
        <h3 class="font-bold text-2xl my-3 capitalize text-transparent bg-gradient-to-b from-green-500 to-blue-300 bg-clip-text">score</h3>
        <Score :scores="scores"/>
        <div class="type">
            <h2 class=" font-bold text-2xl text-pink-600">{{ types[finalType].type }}</h2>
            <h1 class="capitalize font-medium text-xl text-pink-500">type {{finalType-1}}</h1>
            <div class="description">
                <p class="my-2">
                    {{ types[finalType].description }}
                </p>
                <p class="my-2"><b class="text-red-400">Fear:</b> {{ types[finalType].fear }}</p>
                <p class="my-2"><b class="text-yellow-400">Desire:</b> {{ types[finalType].desire }}</p>
                <p class="my-2"><b class="text-blue-400">Motivations:</b> {{ types[finalType].motivations }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Score from './Score.vue';
import { auth } from '../firebase/firebaseInit';

export default {
    name: "Results",
    props: {
        scores: Array,
        lowest: Array,
        highest: Array,
        finalType: Number,
    },
    components: {
        Score,
    },
     data() {
        return {
            types: require('../../types.json'),
            showRegister: null,
        }
    },
    created() {
        this.showRegister = auth.currentUser ? false : true;
    },
    // unmounted(){
    //     if(this.$route.fullPath != "/register" && localStorage.results) {
    //         localStorage.removeItem("results");
    //         localStorage.removeItem("core");
    //     }
    // }
}
</script>

<style scoped>
.resultsContainer{
    @apply
        w-96
        sm:w-full
        max-w-500
        mx-auto
    ;
}
.type{
    @apply
        mx-auto
        my-12
        px-5
        sm:px-0
    ;
}
.description{
    @apply
        text-left
    ;
}
</style>