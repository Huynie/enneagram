<template>
    <div class="mx-auto p-10 text-center h-screen">
        <!-- QUESTION NUMBER COUNTER -->
        <!-- <h1 class="font-bold text-2xl">
            Question {{JSON.parse(counter) + 1}}/{{totalQuestions.length}}
        </h1> -->
        <div v-show="!showResult">
            <ProgressBar :filled="filled"/>
            <h2 class="font-medium my-2">
                Select the statement that best describes you:
            </h2>
            <div class="my-8 w-max mx-auto md:flex justify-center items-center transition-opacity ease-in-out opacity-100">
                <div>
                    <Button
                        tailwindClass="test__btn"
                        :text="questions1"
                        @click="choice1"
                        id="choice1"
                    />
                </div>
                <h2 class="uppercase text-pink-700">or</h2>
                <div>
                    <Button
                        tailwindClass="test__btn"
                        :text="questions2"
                        @click="choice2"
                        id="choice2"
                    />
                </div>
            </div>
            <div>
                <Button
                    v-show="showNext"
                    tailwindClass="btn-next"
                    text="next"
                    @click="next"
                    :isDisabled="disabledBtn"
                />
                <Button
                    v-show="showGetType"
                    tailwindClass="btn-next"
                    text="get results"
                    @click="getType"
                    :isDisabled="disabledBtn"
                />
            </div>

        </div>
        <Results
            v-show="showResult"
            :scores="score"
            :finalType="finalType"
        />
    </div>
</template>

<script>
import Button from '../components/Button';
import Results from '../components/Results';
import ProgressBar from '../components/ProgressBar';
import db, { auth } from '../firebase/firebaseInit';

export default {
    name: 'Test',
    components: {
        Button,
        Results,
        ProgressBar
    },
    data() {
        return {
            totalQuestions: [],
            questions1: '',
            questions2: '',
            answer1: '',
            answer2: '',
            choice: '',
            counter: null,
            tally: {
                A: 0,
                B: 0,
                C: 0,
                D: 0,
                E: 0,
                F: 0,
                G: 0,
                H: 0,
                I: 0,
            },
            score: [],
            scores: {
                D:0,
                F:0,
                C:0,
                E:0,
                H:0,
                B:0,
                I:0,
                G:0,
                A:0,
            },
            showResult: false,
            showGetType: false,
            showNext: true,
            finalType: 0,
            disabledBtn: true,
            filled: null,
        }
    },
    methods:{
        choice1() {
            document.getElementById("choice1").focus();
            this.answer1 = this.totalQuestions[this.counter].answer1;
            this.choice = this.answer1;
            this.disabledBtn = false;
        },
        choice2() {
            document.getElementById("choice2").focus();
            this.answer2 = this.totalQuestions[this.counter].answer2;
            this.choice = this.answer2;
            this.disabledBtn = false;
        },
        next() {
            if(this.choice !== '') {
                this.tally[this.choice] ++;
                this.scores[this.choice]++;
                localStorage.tally = JSON.stringify(this.tally);
                this.counter ++
                localStorage.progress = this.counter;
                this.filled = `${(parseInt(this.counter) + 1) * 0.695}%`;
                this.questions1 = this.totalQuestions[this.counter].choice1
                this.questions2 = this.totalQuestions[this.counter].choice2
                // this.showNext = this.counter === 143 ? false : true
                // this.showGetType = this.counter === 143 ? true : false
            }else{
                confirm('Please choose an answer.')
                return
            }

            this.choice = '';
            this.disabledBtn = true
        },
        async getType() {
            if(this.choice !== '') {
                this.tally[this.choice] ++
                // localStorage.tally = JSON.stringify(this.tally);
                // this.counter ++
                // localStorage.progress = this.counter;
                const score = [
                    this.tally.D,
                    this.tally.F,
                    this.tally.C,
                    this.tally.E,
                    this.tally.H,
                    this.tally.B,
                    this.tally.I,
                    this.tally.G,
                    this.tally.A,
                ]
                this.score = score;
                this.finalType = score.indexOf(Math.max(...score));
                this.showResult = true;

                //Remove from local storage
                localStorage.removeItem("progress");
                localStorage.removeItem("tally");

                // Save to firebase if logged in
                if(auth.currentUser) {
                    this.$store.dispatch("saveResults", score);
                    return;
                }
                localStorage.score = JSON.stringify(score);
                // localStorage.testScore = JSON.stringify(this.scores);
            }else{
                confirm('Please choose an answer.')
                return
            }
        }
    },
    created() {
        // create progress in local storage with value of 0 if not already there
        localStorage.progress ??= localStorage.progress = 0;
        // LS progress value assigned to counter
        this.counter = parseInt(localStorage.progress);
        this.filled = `${(parseInt(localStorage.progress) + 1) * 0.695}%`;
        // create empty tally in local storage if not already there
        localStorage.tally ??= localStorage.tally = JSON.stringify(this.tally);
        // LS tally value assigned to tally
        this.tally = JSON.parse(localStorage.tally);
        this.totalQuestions = require('../../questions.json')
        this.questions1 = this.totalQuestions[this.counter].choice1;
        this.questions2 = this.totalQuestions[this.counter].choice2;
        this.answer1 = this.totalQuestions[this.counter].answer1;
        this.answer2 = this.totalQuestions[this.counter].answer2;
        this.showNext = this.counter === 143 ? false : true;
        this.showGetType = this.counter === 143 ? true : false;
    },
    updated() {
        this.showNext = this.counter === 143 ? false : true;
        this.showGetType = this.counter === 143 ? true : false;
    }
}
</script>

<style >
.test__btn{
    @apply
        bg-questions
        mx-4
        w-60
        h-48
        px-8
        min-w-min
        outline-none
        text-left
        focus:bg-pressed
        focus:ring-pink-500
        focus:ring-2
        focus:outline-none
    ;
}
.btn-next{
    @apply 
        bg-pink-500
        disabled:opacity-30
        my-4
        uppercase
        font-bold
        w-32
    ;
}
</style>