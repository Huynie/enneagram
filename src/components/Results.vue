<template>
    <div class="resultsContainer">
        <h3 class="font-bold text-2xl my-3 text-yellow-800">Results</h3>
        <Score :scores="scores"/>
        <div class="type">
            <h2 class="my-6 font-bold text-xl">{{ types[finalType].type }}</h2>
            <div class="description">
                <p class="my-2">
                    {{ types[finalType].description }}
                </p>
                <p class="my-2"><b class="text-red-800">Fear:</b> {{ types[finalType].fear }}</p>
                <p class="my-2"><b class="text-yellow-600">Desire:</b> {{ types[finalType].desire }}</p>
                <p class="my-2"><b class="text-blue-700">Motivations:</b> {{ types[finalType].motivations }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Score from './Score.vue';

export default {
    name: "Results",
    props: {
        scores: Array,
        lowest: '',
        highest: '',
        finalType: Number,
    },
    components: {
        Score,
    },
     data() {
        return {
            types: require('../../types.json')
        }
     }
}
</script>

<style scoped>
.resultsContainer{
    @apply
        w-10/12
        max-w-80
        mx-auto
        my-8
    ;
}
.type{
    @apply
        w-full
        mx-auto
        my-12
    ;
}
.description{
    @apply
        text-left
    ;
}
</style>