<template>
  <div @click="modal">
      <div class="w-52 h-52 bg-purple-500 rounded-3xl mx-auto my-5 justify-center items-center flex text-white text-2xl">
          image
          <Modal
            v-show="modalActive"
            text="avatar"
          />
        </div>
  </div>
</template>

<script>
    import Modal from './Modal';
export default {
    name: "Avatar",
    components: {
        Modal
    },
    data() {
        return {
            modalActive: false,
        }
    },
    methods: {
        modal() {
           this.modalActive = !this.modalActive;
        }
    }
}
</script>

<style>

</style>