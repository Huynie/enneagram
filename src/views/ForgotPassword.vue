<template>
  <div class="p-10 h-screen">
    <!-- <Modal/>
    <Loading/> -->
    <form class="w-80 mx-auto" v-show="!reset">
      <div class="flex flex-col space-y-3">
        <label class="text-center">Enter your email to reset your password</label>
        <input type="email" v-model="email" placeholder="enter email" class="rounded-sm border-2 border-gray-100"/>
      </div>
      <div class="text-center">
        <Button
          text="Reset"
          @click.prevent="resetPassword"
          tailwindClass="bg-primary hover:bg-questions px-5"
        />
      </div>
    </form>
    <div v-show="reset" class="w-max mx-auto">
      {{modalMessage}}
    </div>
    <div v-show="loading" class="w-max mx-auto">loading...</div>
  </div>
</template>

<script>
  import { sendPasswordResetEmail } from 'firebase/auth';
  import { auth } from '../firebase/firebaseInit';
  import Button from '../components/Button';
  import Loading from '../components/Loading';
  import Modal from '../components/Modal';

export default {
  name: "ForgotPassword",
  components : {
    Button,
    Modal,
    Loading
  },
  data () {
    return {
      email: "",
      loading: null,
      modalActive: false,
      modalMessage: "",
      reset: null,
    }
  },
  methods: {
    resetPassword() {
      this.loading = true;
      sendPasswordResetEmail(auth, this.email)
        .then(() => {
          console.log(this.email);
          this.modalMessage = "If your accrount exists you will receive an email";
          this.loading = false;
          this.modalActive = true;
          this.reset = true
        }).catch(err => {
          console.log(err.message, this.email)
          this.modalMessage = err.message;
          this.loading = false;
          this.modalActive = true;
        })
    },
    closeModal() {
      this.modalActive = !this.modalActive;
      this.email = "";
    },
  },
}
</script>

<style>

</style>