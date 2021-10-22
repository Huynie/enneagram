<template>
  <div class="p-10">
      <h1 class="mx-auto w-max text-5xl">Dashboard</h1>
      <div class="w-52 h-52 bg-purple-500 rounded-3xl mx-auto my-5 justify-center items-center flex text-white text-2xl">image</div>
      <div class="w-max mx-auto text-xl space-y-2">
        <h1>{{this.name}}</h1>
        <h2>{{this.userName}}</h2>
        <h2>{{this.email}}</h2>
        <h3>{{this.core}}</h3>
        <h3>{{this.highs}}</h3>
        <h3>{{this.lows}}</h3>
      </div>
  </div>
</template>

<script>
import Button from '../components/Button';
import db , { auth } from '../firebase/firebaseInit';
import { getDoc, doc, query, onSnapshot } from 'firebase/firestore/lite';
import { signOut } from 'firebase/auth'

export default {
    name: 'Dashboard',
    components: {
        Button
    },
    data (){
        return {
            name: "",
            userName: "",
            email: "",
            core: "",
            highs: "",
            lows: "",
            results: null,
        }
    },
    async mounted() {
        if(auth.currentUser) {
            const userDB = doc(db, `users/${auth.currentUser.uid}`);
            const snapshot = await getDoc(userDB);
            if(snapshot.exists()) {
                const snapData = snapshot.data();
                this.name = `${snapData.firstName} ${snapData.lastName}`;
                this.userName = snapData.userName;
                this.email = snapData.email;
                this.core = snapData.core;
                this.highs = snapData.highs;
                this.lows = snapData.lows;
                this.results = snapData.results;
            } 
        }
    }
}
</script>

<style>

</style>