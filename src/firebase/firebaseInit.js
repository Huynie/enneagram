import {initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCULs8RNL-aOMXhpBUrX7Mn7fyIov9h6Tc",
  authDomain: "en-gram.firebaseapp.com",
  projectId: "en-gram",
  storageBucket: "en-gram.appspot.com",
  messagingSenderId: "1096010449978",
  appId: "1:1096010449978:web:ce2c4b7cf9f955d3746103",
  measurementId: "G-K9KVYT5P2M"
});

const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export default db;