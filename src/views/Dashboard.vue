<template>
    <div class=" relative">
        <div class="profile">
            <Avatar/>
                <h1 class="profile__header">{{$store.state.firstName}} {{$store.state.lastName}}</h1>
            <h2 class="text-pink-700">{{$store.state.email}}</h2>
            <!-- <h2 class="text-pink-500 text-2xl font-bold">{{this.userName}}</h2> -->
            <div class="leftCurve">
                <div></div>
            </div>
        </div>
        <div class="mainInfoContainer h-5/12">
            <div class="grid grid-row-3 lg:flex h-auto lg:h-screen">
                <div class="section relative row-start-2 row-end-3 z-50">
                    <h1 class="section__title z-50">attributes</h1>
                    <RadarChart />
                </div>
                <div class="section rounded-tl-3xl relative row-start-1 row-end-2">
                    <div class="font-bold z-50">
                        <h4 class="capitalize text-pink-500 text-3xl">{{$store.state.descriptions[$store.state.core].type}}</h4>
                        <h3 class="text-center text-pink-300 text-xl mt-2">Type {{$store.state.core + 1}}</h3>
                    </div>
                    <div class="type">
                        <div>
                            <h2 class="type__title">highs</h2>
                            <div class="type__score">
                                <h3 class="type__score--text">T {{$store.state.highs[1]}}</h3>
                                <h3 class="type__score--text">T {{$store.state.highs[2]}}</h3>
                            </div>
                        </div>
                        <div>
                            <h2 class="type__title">lows</h2>
                            <div class="type__score">
                                <h3 class="type__score--text">T {{$store.state.lows[0]}}</h3>
                                <h3 class="type__score--text">T {{$store.state.lows[1]}}</h3>
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
                        <h1 class="section__title">result history</h1>
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
import RadarChart from '../components/RadarChart';
// import db , { auth } from '../firebase/firebaseInit';
// import { getDoc, doc, updateDoc, arrayRemove } from 'firebase/firestore/lite';
import { mapActions } from 'vuex';

export default {
    name: 'Dashboard',
    components: {
        Button,
        Score,
        Avatar,
        RadarChart
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
        ...mapActions([
            'deleteResult'
        ])
    }
}
</script>

<style scoped>
/*     .profile{
        box-shadow: inset 0 5px 2px rgba(0, 0, 0, 0.25);
        border-radius: 10rem 0 0 0;
    } */
    .profile{
        box-shadow: 0 5px 4px rgba(0, 0, 0, 0.2);
        border-radius: 0 0 5vw 0;
        @apply
            bg-primary
            flex flex-col
            items-center
            relative
            h-80
            z-40
        ;
    }
    .profile__header{
        @apply text-3xl font-bold text-white;
    }
    .mainInfoContainer{
        @apply relative overflow-auto md:overflow-hidden;
    }
    .type{
        @apply flex mt-5 mb-10 z-50;
    }
    .type__title{
        @apply uppercase font-bold text-lg text-gray-500 px-10 mb-3;
    }
    .type__score{
        @apply flex justify-center space-x-5;
    }
    .type__score--text{
        @apply p-1 rounded-full bg-pink-50 shadow-sm text-pink-500;
    }
    .leftCurve{
        @apply h-40 w-40 bg-primary absolute -bottom-40 left-0 z-50 overflow-hidden;
    }
    .leftCurve > div{
        height: 300px;
        width: 300px;
        background-color: white;
        border-radius: 5vw 5vw 0 0;
        box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.22);
        position: absolute;
        bottom: -140px;
        left: 0px;
    }
    .leftCurve-white > div{
        height: 300px;
        width: 300px;
        background-color: blue;
        border-radius: 9999px 9999px 0 0;
        box-shadow: inset 0px 5px 5px rgba(0, 0, 0, 0.25);
        position: absolute;
        bottom: -140px;
        left: 0px;
    }
    .section{
        box-shadow: -2px -2px 4px rgba(0, 0, 0, 0.1);
        border-top-left-radius: 5vw;
        min-height: 75vh;
        @apply
        w-full
        flex
        flex-col
        items-center
        pt-10
        ;
    }
    .section__title{
        @apply
            text-xl
            uppercase
            my-5
            w-max
            mx-auto
            font-bold
            text-transparent
            bg-gradient-to-b
            from-green-500
            to-blue-300
            bg-clip-text
        ;
    }
</style>