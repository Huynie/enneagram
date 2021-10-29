<template>
    <div div class="w-80 mx-auto h-3 bg-gray-200 rounded-full">
        <div
        class="bg-green-400 h-full rounded-l-full"
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