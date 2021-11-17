<template>
    <div class="p-10 h-screen">
        <h1 class="w-max mx-auto text-4xl py-5 font-medium text-transparent bg-gradient-to-b from-green-500 to-blue-300 bg-clip-text">Register</h1>
        <form class="w-80 mx-auto space-y-3" id="register" @submit="checkForm">
            <div class="flex flex-col ">
                <label>first name</label>
                <input 
                    type="text"
                    v-model="firstName"
                    placeholder="enter first name"
                    class="rounded-sm border-2 border-gray-100"
                />
            </div>
            <div class="flex flex-col ">
                <label>last name</label>
                <input 
                    type="text"
                    v-model="lastName"
                    placeholder="enter last name"
                    class="rounded-sm border-2 border-gray-100"
                />
            </div>
            <!-- <div class="flex flex-col ">
                <label>username</label>
                <input 
                    type="text"
                    v-model="username"
                    placeholder="enter username"
                    class="rounded-sm border-2 border-gray-100"
                />
            </div> -->
            <div class="flex flex-col ">
                <label for="email">email</label>
                <input
                    type="email"
                    name="email"
                    v-model="email"
                    placeholder="enter email"
                    class="rounded-sm border-2 border-gray-100"
                    required
                />
            </div>
            <div class="flex flex-col ">
                <label>password</label>
                <input 
                    type="password"
                    v-model="password"
                    placeholder="enter password"
                    class="rounded-sm border-2 border-gray-100"
                />
            </div>
            <div>
                <p v-show="error" class="text-pink-500">
                    {{this.errorMsg}}
                </p>
            </div>
            <div class="text-center">
                <Button
                    text="register"
                    type="submit"
                    @click.prevent="register"
                    tailwindClass="btn-register"
                />
            </div>
        </form>
    </div>
</template>

<script>
import Button from '../components/Button';
import db, { auth } from '../firebase/firebaseInit';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc, arrayUnion } from 'firebase/firestore/lite';

export default {
    name: 'Register',
    components: {
        Button
    },
    data () {
        return {
            firstName: "Mike",
            lastName: "Jonez",
            // username: "MkJnz",
            email: 'test2@test.com',
            password: 'test123',
            error: null,
            errorMsg: ""
        }
    },
    methods: {
        async register(e) {
            e.preventDefault();
            if(
                this.firstName !== "" &&
                this.lastName !== "" &&
                this.username !== "" &&
                this.email !== "" &&
                this.password !== "" 
            ) {
                try{
                    // Create new account in Firebase Authentication database
                    const createUser = await createUserWithEmailAndPassword(auth, this.email, this.password);

                    const userDatabase = doc(db, `users/${createUser.user.uid}`);
                    const resultExist = localStorage.score ? arrayUnion({
                        "date/time": new Date(),
                        score: JSON.parse(localStorage.score)
                        }) : [];
                    const userData = {
                        firstName: this.firstName,
                        lastName: this.lastName,
                        userName: this.username,
                        email: this.email,
                        results: resultExist,
                    };

                    // create new doc in Firebase Firestore database
                    await setDoc( userDatabase, userData );
                    localStorage.removeItem("score");
                    console.log('Saved to DB & score deleted');
                    // this.$router.go({ path: "/dashboard" });
                    this.$router.go({ path: this.$router.path });
                    
                } catch (err) {
                    this.error = true;
                    this.errorMsg = err.message.slice(10);
                }
                return;
            }
            this.error = true;
            this.errorMsg = "please fill out all the fields";
        }
    }
}
</script>

<style>
    .btn-register{
        @apply
            bg-primary
            mx-4
            w-56
            min-w-min
            outline-none
            focus:bg-pressed
            focus:ring-pink-300
            hover:bg-questions
            focus:ring-2
            focus:outline-none
        ;
    }
    label{
        @apply
            text-gray-600;
    }
</style>