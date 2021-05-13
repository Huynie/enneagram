<template>
    <div class="resultsContainer">
        <h3 class="font-bold text-2xl my-3 text-yellow-800">Results</h3>
        <table class="results">
            <thead>
            <tr>
                <th
                    v-for="(_, index) in results"
                    :key="index"
                     class="score"
                >
                    T{{index+1}}
                </th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td
                    v-for="(type, index) in results"
                    :key="index"
                     class="score"
                >
                    {{type}}
                </td>
            </tr>
            </tbody>
        </table>
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
export default {
    name: "Results",
    props: {
        results: Array,
        lowest: '',
        highest: '',
        finalType: Number,
    },
     data() {
        return {
            types: require('../../types.json')
        }
     },
    created() {
        this.types = require('../../types.json')
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
.results{
    @apply
        table-auto
        mx-auto
        my-4
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
.score{
    @apply
        px-2
        py-2
        bg-yellow-50
        border
        border-yellow-200
        text-yellow-600
    ;
}
</style>