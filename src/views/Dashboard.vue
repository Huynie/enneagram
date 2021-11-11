<template>
  <div class=" relative">
      <div class="bg-primary flex flex-col items-center relative h-80 z-40 profile2">
        <Avatar/>
         <h1 class="text-3xl font-bold text-white">{{$store.state.firstName}} {{$store.state.lastName}}</h1>
        <h2 class="text-pink-700">{{$store.state.email}}</h2>
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
                    <h4 class="capitalize text-pink-500 text-3xl">{{$store.state.descriptions[$store.state.core].type}}</h4>
                    <h3 class="text-center text-pink-300 text-xl mt-2">Type {{$store.state.core + 1}}</h3>
                </div>
                <div class="flex mt-5 mb-10 z-50">
                    <div>
                        <h2 class="uppercase font-bold text-lg text-gray-500 px-10 mb-3">highs</h2>
                        <div class="flex justify-center space-x-5">
                            <h3 class="p-1 rounded-full bg-pink-50 shadow-sm text-pink-500">T {{$store.state.highs[1]}}</h3>
                            <h3 class="p-1 rounded-full bg-pink-50 shadow-sm text-pink-500">T {{$store.state.highs[2]}}</h3>
                        </div>
                    </div>
                    <div>
                        <h2 class="uppercase font-bold text-lg text-gray-500 px-10 mb-3">lows</h2>
                        <div class="flex justify-center space-x-5">
                            <h3 class="p-1 rounded-full bg-pink-50 shadow-inner text-pink-500">T {{$store.state.lows[0]}}</h3>
                            <h3 class="p-1 rounded-full bg-pink-50 shadow-inner text-pink-500">T {{$store.state.lows[1]}}</h3>
                        </div>
                    </div>
                </div>
                <div class="mx-auto w-80">
                    <p class="my-2">
                        {{ $store.state.descriptions[$store.state.core].description }}
                    </p>
                    <p class="my-2"><b class="text-red-400">Fear:</b> {{ $store.state.descriptions[$store.state.core].fear }}</p>
                    <p class="my-2"><b class="text-yellow-400">Desire:</b> {{ $store.state.descriptions[$store.state.core].desire }}</p>
                    <p class="my-2"><b class="text-blue-400">Motivations:</b> {{ $store.state.descriptions[$store.state.core].motivations }}</p>
                </div>
            </div>
            <div class="section bg-white">
                <div>
                    <h1 class="text-xl uppercase my-5 w-max mx-auto font-bold text-transparent bg-gradient-to-b from-green-500 to-blue-300 bg-clip-text">result history</h1>
                    <div
                        class="w-max mx-auto my-10"
                        v-for="(result, index) in $store.state.results"
                        :key="index"
                        >
                        <div class="flex w-full">
                            <h2 class="text-green-600 flex-1 font-medium">{{result["date/time"].toDate().toDateString()}}</h2>
                            <h2 class="text-green-600 flex-1 font-light">{{result["date/time"].toDate().toLocaleTimeString('en-US')}}</h2>
                            <button @click="deleteResult(index)">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-pink-300 hover:text-pink-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
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
// import db , { auth } from '../firebase/firebaseInit';
// import { getDoc, doc, updateDoc, arrayRemove } from 'firebase/firestore/lite';
import { mapActions } from 'vuex';

export default {
    name: 'Dashboard',
    components: {
        Button,
        Score,
        Avatar
    },
    data (){
        return {
            core: 0,
            highs: [],
            lows: [],
            results: [],
            score: [],
            types: [
                {
                    "type": "Loading...",
                    "description": "Loading...",
                    "fear": "Loading...",
                    "desire": "Loading...", 
                    "motivations": "Loading..."
                }
            ]
        }
    },
    methods: {
        // async deleteResult(result, index) {
        //     const user = doc(db, `users/${auth.currentUser.uid}`);
        //     try {
        //         await updateDoc(user, { results: arrayRemove(result) });
        //         this.results.splice(index, 1);
        //     } catch (err) {
        //         console.log(err);
        //     }
        // },
        ...mapActions([
            'deleteResult'
        ])
    },
    //  mounted() {
    //     try{
    //         this.$store.dispatch('getCurrentUser');
    //         const latestScore = [...this.$store.state.results[0].score];

    //         //GET TOP 2 HIGHEST TYPE EXCLUDING CORE TYPE
    //         const highNums = latestScore.sort((a,b) => b-a).slice(0,3);
    //         highNums.forEach((num) => {
    //             this.highs.push(this.$store.state.results[0].score.indexOf(num) + 1);
    //         });

    //         //GET 2 LOWEST TYPE
    //         const lowNums = latestScore.sort((a,b) => a-b).slice(0,2);
    //         lowNums.forEach((num) => {
    //             this.lows.push(this.$store.state.results[0].score.indexOf(num) + 1);    
    //         });

    //         // Set Core Type
    //         this.core = this.highs[0] - 1;
    //     }catch (error) {
    //         console.log(error);
    //     }
    // }
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