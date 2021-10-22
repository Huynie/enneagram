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
      <div class="w-max mx-auto" v-for="result in results">
          <!-- <Results
            v-show="true"
            :results="results"
            :finalType="core"
          /> -->
          <h2>{{result["date/time"]}}</h2>
          <h3>{{result.score}}</h3>
      </div>
  </div>
</template>

<script>
import Button from '../components/Button';
import Results from '../components/Results';
import db , { auth } from '../firebase/firebaseInit';
import { getDoc, doc, query, onSnapshot } from 'firebase/firestore/lite';

export default {
    name: 'Dashboard',
    components: {
        Button,
        Results
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
                // snapData.results.forEach((result) => {
                    // this.score = [result.score];
                    // this.date = [result.date];
                    // this.results = result.score
                // });
            }
            console.log(this.results);

        }
    }
}
</script>

<style>

</style>