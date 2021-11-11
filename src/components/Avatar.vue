<template>
  <div @click="modal">
      <div class="w-52 h-52 bg-pink-500 rounded-full mx-auto my-5 justify-center items-center flex text-white text-2xl overflow-hidden">
          <div class="rounded-full bg-green-500 overflow-hidden w-48 h-48 flex justify-center items-center">
            <h1 class="font-medium text-8xl">
              {{$store.state.initials}}
            </h1>
          </div>
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