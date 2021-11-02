<template>
  <table class="results">
        <thead>
            <tr>
                <th
                    v-for="(_, index) in scores"
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
                    v-for="(type, index) in scores"
                    :key="index"
                        class="score"
                >
                    {{type}}
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: "Score",
    props: {
        scores: Array
    }
}
</script>

<style scoped>
.results{
    @apply
        table-auto
        mx-auto
        my-4
        rounded-xl
        overflow-hidden
        shadow-md
    ;
}
.score{
    @apply
        px-2
        py-2
        bg-secondary
        shadow-inner
        border-green-200
        text-green-600
        text-sm
        text-center
    ;
}
</style>