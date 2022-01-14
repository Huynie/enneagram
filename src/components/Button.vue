<template>
    <button
        class="btnBase"
        @click="onClick()"
        :class="[tailwindClass]"
        :disabled="isDisabled"
    >
        <slot></slot>
        {{ text }}
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        tailwindClass: String,
        isDisabled: Boolean
    },
    data() {
        return{
            btnBaseStyle: 'rounded-md py-3 px-4 tracking-wide text-white focus:outline-none my-3'
        }
    },
    methods: {
        onClick() {
            this.$emit('btn-click')
        }
    }
}
</script>

<style>
    .btnBase{
        @apply
        rounded-md
        py-3
        px-4
        tracking-wide
        text-white
        focus:outline-none
        my-3
    }
</style>