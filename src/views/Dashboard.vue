<template>
  <div class="p-10">
      <h1 class="mx-auto w-max text-5xl">Dashboard</h1>
        <Avatar @click="avatarModal"/>
      <div class="w-max mx-auto text-xl space-y-2">
        <h1>{{this.name}}</h1>
        <h2>{{this.userName}}</h2>
        <h2>{{this.email}}</h2>
        <h3>{{this.core}}</h3>
        <h3>{{this.highs}}</h3>
        <h3>{{this.lows}}</h3>
      </div>
      <div>
        <h1 class="text-xl uppercase my-5 w-max mx-auto">result history</h1>
        <div
            class="w-max mx-auto"
            v-for="(result, index) in results"
            :key="index"
            >
            <h2>{{result["date/time"].toDate().toDateString()}}  {{result["date/time"].toDate().toLocaleTimeString('en-US')}}</h2>
            <Score :scores="result.score"/>
        </div>
      </div>
  </div>
</template>

<script>
import Button from '../components/Button';
import Score from '../components/Score';
import Avatar from '../components/Avatar';
import db , { auth } from '../firebase/firebaseInit';
import { getDoc, doc, query, onSnapshot } from 'firebase/firestore/lite';

export default {
    name: 'Dashboard',
    components: {
        Button,
        Score,
        Avatar
    },
    data (){
        return {
            name: "",
            userName: "",
            email: "",
            core: "",
            highs: "",
            lows: "",
            results: [],
            score: null,
            date: null,
        }
    },
    methods: {
        showTimeAndScore () {
            this.results.map((res) => {
              console.log(res[date/time], res.score)
              return (res[date/time], res.score)
        })}
    },
    async created() {
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