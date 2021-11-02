<template>
  <div class="h-screen min-h-full relative">
      <div class="bg-primary flex flex-col items-center relative relative h-80 z-40 profile2">
        <Avatar @click="avatarModal"/>
        <h1 class="text-3xl font-bold text-white absolute bottom-5">{{this.name}}</h1>
        <div class="h-40 w-40 bg-primary absolute -bottom-40 left-0 z-50 leftCurve overflow-hidden">
            <div></div>
        </div>
        <!-- <div class="h-20 w-20 bg-blue-100 absolute -bottom-20 left-0 profile"></div> -->
        <!-- <div class="h-20 w-20 bg-blue-100 absolute bottom-0 right-0 profile2 z-50"></div> -->
      </div>
      <!-- <img :src="require('@/assets/divider-primary.png')" alt="divider-primary" class=" max-w-screen w-full"> -->
      <div class="relative">
        <div class="flex flex-col items-center space-y-2 py-5">
            <!-- <h2 class="text-pink-500 text-2xl font-bold">{{this.userName}}</h2> -->
            <h2>{{this.email}}</h2>
            <div class="text-pink-300 text-2xl font-bold">
                <h3 >Type {{this.core}}</h3>
            </div>
            <div class="flex space-x-5">
                <div>
                    <h2 class="uppercase">highs</h2>
                    <h3>{{this.highs}}</h3>
                </div>
                <div>
                    <h2 class="uppercase">lows</h2>
                    <h3>{{this.lows}}</h3>
                </div>
            </div>
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

<style >
    .profile{
        box-shadow: inset 0 5px 2px rgba(0, 0, 0, 0.25);
        border-radius: 10rem 0 0 0;
    }
    .profile2{
        box-shadow: 0 5px 5px rgba(0, 0, 0, 0.25);
        border-radius: 0 0 10rem 0;
    }
    .leftCurve > div{
        height: 300px;
        width: 300px;
        background-color: white;
        border-radius: 9999px 9999px 0 0;
        box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.25);
        position: absolute;
        bottom: -140px;
        left: 0px;
    }
</style>