<template>
    <div div class="md:w-2/5 w-4/5 mx-auto h-1 bg-gray-200 rounded-full">
        <div
        class="bg-pink-500 h-full rounded-l-full"
        v-bind:style="{'width': filled }"
        ></div>
    </div>
</template>

<script>
export default {
    name: "ProgressBar",
    data () {
        return {
            
        }
    },
    props: {
        filled: String
    }
}
</script>

<style>

</style>