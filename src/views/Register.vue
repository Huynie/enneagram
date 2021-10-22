<template>
    <div class="p-10">
        <h1 class="w-max mx-auto text-4xl py-5">Register</h1>
        <form class="w-80 mx-auto space-y-3">
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
            <div class="flex flex-col ">
                <label>username</label>
                <input 
                    type="text"
                    v-model="username"
                    placeholder="enter username"
                    class="rounded-sm border-2 border-gray-100"
                />
            </div>
            <div class="flex flex-col ">
                <label>email</label>
                <input 
                    type="email"
                    v-model="email"
                    placeholder="enter email"
                    class="rounded-sm border-2 border-gray-100"
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
                <p v-show="error">
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
import { collection, getDoc, getDocs, setDoc, doc, query, limit } from 'firebase/firestore/lite';

export default {
    name: 'Register',
    components: {
        Button
    },
    data () {
        return {
            firstName: "Bob",
            lastName: "Smith",
            username: "",
            email: 'test@test.com',
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
                const createUser = await createUserWithEmailAndPassword(auth, this.email, this.password)
                const userDatabase = doc(db, `users/${createUser.user.uid}`);
                const userData = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    userName: this.username,
                    email: this.email,
                };
                setDoc( userDatabase, userData)
                this.$router.go({ path: this.$router.path });
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
    label{
        @apply
            text-gray-600;
    }
</style>