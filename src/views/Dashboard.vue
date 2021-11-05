<template>
  <div class=" relative">
      <div class="bg-primary flex flex-col items-center relative h-80 z-40 profile2">
        <Avatar @click="avatarModal"/>
        <h1 class="text-3xl font-bold text-white">{{this.name}}</h1>
        <h2>{{this.email}}</h2>
        <!-- <h2 class="text-pink-500 text-2xl font-bold">{{this.userName}}</h2> -->
        <div class="h-40 w-40 bg-primary absolute -bottom-40 left-0 z-50 leftCurve overflow-hidden">
            <div></div>
        </div>
      </div>
      <div class="relative h-5/12 overflow-auto md:overflow-hidden">
        <div class="grid grid-row-3 lg:flex h-auto lg:h-screen">
            <div class="section relative row-start-2 row-end-3 z-50">
                <h1 class="text-xl uppercase my-5 w-max mx-auto font-bold text-transparent bg-gradient-to-b from-green-500 to-blue-300 bg-clip-text z-50">attributes</h1>
                coming soon!
            </div>
            <div class="section rounded-tl-3xl relative row-start-1 row-end-2">
                <div class="font-bold z-50">
                    <h4 class="capitalize text-pink-500 text-3xl">{{types[this.core - 1].type}}</h4>
                    <h3 class="text-center text-pink-300 text-xl mt-2">Type {{this.core}}</h3>
                </div>
                <div class="flex mt-5 mb-10 z-50">
                    <div>
                        <h2 class="uppercase font-bold text-lg text-gray-500 px-10 mb-3">highs</h2>
                        <div class="flex justify-center space-x-5">
                            <h3 class="p-1 rounded-full bg-pink-100 shadow-sm text-pink-500">T{{this.highs[0]+1}}</h3>
                            <h3 class="p-1 rounded-full bg-pink-100 shadow-sm text-pink-500">T{{this.highs[1]+1}}</h3>
                        </div>
                    </div>
                    <div>
                        <h2 class="uppercase font-bold text-lg text-gray-500 px-10 mb-3">lows</h2>
                        <div class="flex justify-center space-x-5">
                            <h3 class="p-1 rounded-full bg-pink-100 shadow-inner text-pink-500">T{{this.lows[0]+1}}</h3>
                            <h3 class="p-1 rounded-full bg-pink-100 shadow-inner text-pink-500">T{{this.lows[1]+1}}</h3>
                        </div>
                    </div>
                </div>
                <div class="mx-auto w-80">
                    <p class="my-2">
                        {{ types[this.core - 1].description }}
                    </p>
                    <p class="my-2"><b class="text-red-400">Fear:</b> {{ types[this.core - 1].fear }}</p>
                    <p class="my-2"><b class="text-yellow-400">Desire:</b> {{ types[this.core - 1].desire }}</p>
                    <p class="my-2"><b class="text-blue-400">Motivations:</b> {{ types[this.core - 1].motivations }}</p>
                </div>
            </div>
            <div class="section bg-white">
                <div>
                    <h1 class="text-xl uppercase my-5 w-max mx-auto font-bold text-transparent bg-gradient-to-b from-green-500 to-blue-300 bg-clip-text">result history</h1>
                    <div
                        class="w-max mx-auto my-10"
                        v-for="(result, index) in results"
                        :key="index"
                        >
                        <h2>{{result["date/time"].toDate().toDateString()}}  {{result["date/time"].toDate().toLocaleTimeString('en-US')}}</h2>
                        <Score :scores="result.score"/>
                    </div>
                </div>
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
            core: null,
            highs: [],
            lows: [],
            results: [],
            score: null,
            date: null,
            types: require('../../types.json'),
        }
    },
    methods: {
        showTimeAndScore () {
            this.results.map((res) => {
              console.log(res[date/time], res.score)
              return (res[date/time], res.score)
        })}
        ,

    },
    async beforeMount() {
        if(auth.currentUser) {
            const userDB = doc(db, `users/${auth.currentUser.uid}`);
            const snapshot = await getDoc(userDB);
            if(snapshot.exists()) {
                const snapData = snapshot.data();
                this.name = `${snapData.firstName} ${snapData.lastName}`;
                this.userName = snapData.userName;
                this.email = snapData.email;
                this.core = snapData.core;
                this.results = snapData.results;

                const latestScore = this.results.length > 1 ? [...this.results[this.results.length - 1].score] : [...this.results[0].score];
                //GET TOP 2 HIGHEST TYPE EXCLUDING CORE TYPE
                const highNums = latestScore.sort((a,b) => b-a).slice(1,3);
                highNums.forEach((num) => {
                    this.highs.push(this.results[this.results.length - 1].score.indexOf(num))
                });
                //GET 2 LOWEST TYPE
                const LowNums = latestScore.sort((a,b) => a-b).slice(0,2);
                LowNums.forEach((num) => {
                    this.lows.push(this.results[this.results.length - 1].score.indexOf(num))
                });
            }
        };
    }
}
</script>

<style>
    .profile{
        box-shadow: inset 0 5px 2px rgba(0, 0, 0, 0.25);
        border-radius: 10rem 0 0 0;
    }
    .profile2{
        box-shadow: 0 5px 4px rgba(0, 0, 0, 0.2);
        border-radius: 0 0 10rem 0;
    }
    .leftCurve > div{
        height: 300px;
        width: 300px;
        background-color: white;
        border-radius: 9999px 9999px 0 0;
        box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.22);
        position: absolute;
        bottom: -140px;
        left: 0px;
    }
    .leftCurve-white > div{
        height: 300px;
        width: 300px;
        background-color: white;
        border-radius: 9999px 9999px 0 0;
        box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.25);
        position: absolute;
        bottom: -140px;
        left: 0px;
    }
    .section{
        box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.1);
        border-top-left-radius: 150px;
        min-height: 75vh;
        @apply
        w-full
        flex
        flex-col
        items-center
        pt-10
        ;
    }
</style>