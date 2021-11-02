<template>
  <div @click="modal">
      <div class="w-52 h-52 bg-pink-500 rounded-full mx-auto my-5 justify-center items-center flex text-white text-2xl overflow-hidden">
          <div class="rounded-full bg-blue-500 overflow-hidden w-48 h-48 flex justify-center items-center">
            <img :src="require('@/assets/avatar.png')" alt="profile" class="h-48 w-48 rounded-full"/>
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