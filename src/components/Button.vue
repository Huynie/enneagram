<template>
    <button
        @click="onClick()"
        :class="[tailwindClass, btnBaseStyle] "
        :disabled="isDisabled"
    >
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
            btnBaseStyle: 'rounded-md py-3 px-4 tracking-wide text-white focus:outline-none'
        }
    },
    methods: {
        onClick() {
            this.$emit('btn-click')
        }
    }
}
</script>