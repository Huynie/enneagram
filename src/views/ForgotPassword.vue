<template>
  <div>
    <Modal/>
    <Loading/>
    <form action="">
      <div class="flex flex-col ">
        <label>Reset your password</label>
        <input type="email" v-model="email" placeholder="enter email" class="rounded-sm border-2 border-gray-100"/>
      </div>
      <Button
        text="reset"
        @click.prevent="resetPassword"

      />
    </form>
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