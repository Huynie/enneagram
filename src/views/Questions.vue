<template>
    <div class="mx-auto text-center p-10">
        <!-- <h1 class="font-bold text-2xl">
            Question {{JSON.parse(counter) + 1}}/{{totalQuestions.length}}
        </h1> -->
        <ProgressBar :filled="filled"/>
        <h2 class="font-medium my-2">
            Select the statement that best describes you:
        </h2>
        <div class="my-8 flex flex-col items-center justify-center h-full transition-opacity ease-in-out opacity-100">
            <Button
                tailwindClass="btn-blue"
                :text="questions1"
                @click="choice1"
                id="choice1"
            />
            or
            <Button
                tailwindClass="btn-blue"
                :text="questions2"
                @click="choice2"
                id="choice2"
            />
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
        <Results
            v-show="showResult"
            :scores="results"
            :finalType="finalType"
        />
    </div>
</template>

<script>
import Button from '../components/Button';
import Results from '../components/Results';
import ProgressBar from '../components/ProgressBar';
import db, { auth } from '../firebase/firebaseInit';
import { setDoc, doc, arrayUnion } from 'firebase/firestore/lite';

export default {
    name: 'Questions',
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
            counter: 0,
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
            results: [],
            showResult: false,
            showGetType: Boolean,
            showNext: true,
            showSave: true,
            finalType: null,
            disabledBtn: true,
            filled: null
        }
    },
    methods:{
        choice1() {
            document.getElementById("choice1").focus();
            this.answer1 = this.totalQuestions[this.counter].answer1
            this.choice = this.answer1
            this.disabledBtn = false
        },
        choice2() {
            document.getElementById("choice2").focus();
            this.answer2 = this.totalQuestions[this.counter].answer2
            this.choice = this.answer2
            this.disabledBtn = false
        },
        next() {
            if(this.choice !== '') {
                this.tally[this.choice] ++
                localStorage.tally = JSON.stringify(this.tally);
                this.counter ++
                localStorage.progress = this.counter;
                this.filled = `${(parseInt(this.counter) + 1) * 0.695}%`;
                console.log(this.filled)
                this.questions1 = this.totalQuestions[this.counter].choice1
                this.questions2 = this.totalQuestions[this.counter].choice2
                this.showNext = this.counter === 143 ? false : true
                this.showGetType = this.counter === 143 ? true : false
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
                const result = [
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
                this.results = result
                this.finalType = result.indexOf(Math.max(...result));
                this.showResult = true;

                // Save to firebase if logged in
                if(auth.currentUser) {
                    const dataBase = doc(db, `users/${auth.currentUser.uid}`);
                    await setDoc(
                        dataBase,
                        {
                            results: arrayUnion(
                                {
                                "date/time": new Date(),
                                score: result
                                }
                            ),
                            core: this.finalType
                        },
                        {
                            merge: true
                        }
                    ).then(() => {
                        console.log("saved to firebase")
                    }).catch(err => {
                        console.log(err.message)
                    })
                }

                // Clear local storage
                localStorage.removeItem("progress");
                localStorage.removeItem("tally");
            }else{
                confirm('Please choose an answer.')
                return
            }
            this.choice = '';
            this.disabledBtn = true
        },
        progressBar() {
            console.log("width: ", this.counter +1)
        }
    },
    created() {
        // create progress in local storage with value of 0 if not already there
        localStorage.progress ??= localStorage.progress = 0 ;
        // LS progress value assigned to counter
        this.counter = localStorage.progress;
        this.filled = `${(parseInt(localStorage.progress) + 1) * 0.695}%`
        console.log(this.filled)
        // create empty tally in local storage if not already there
        localStorage.tally ??= localStorage.tally = JSON.stringify(this.tally);
        // LS tally value assigned to tally
        this.tally = JSON.parse(localStorage.tally);
        this.totalQuestions = require('../../questions.json')
        this.questions1 = this.totalQuestions[this.counter].choice1
        this.questions2 = this.totalQuestions[this.counter].choice2
        this.answer1 = this.totalQuestions[this.counter].answer1
        this.answer2 = this.totalQuestions[this.counter].answer2
        this.finalType = 0
        this.showGetType = false
    }
}
</script>

<style>
.btn-blue{
    @apply
        bg-blue-500
        mx-4
        w-56
        min-w-min
        outline-none
        focus:bg-blue-700
        focus:ring-blue-300
        focus:ring-8
        focus:outline-none
    ;
}
.btn-next{
    @apply 
        bg-green-500
        disabled:opacity-30
        my-4
        uppercase
        font-bold
        w-32
    ;
}
.btn-save{
    @apply 
        bg-yellow-500
        disabled:opacity-30
        my-4
        uppercase
        font-bold
        w-32
    ;
}
</style>