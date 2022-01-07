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

// const user1 = doc(db, 'users/e9wd518aJIco6nGTqtGa')
// console.log(getDoc(user1))

// get single doc(1 specific user)
// const getData = async () => {
//     const snapshot = await getDoc(user1);
//     if(snapshot.exists()) {
//         const snapData = snapshot.data();
//         console.log(JSON.stringify(snapData));
//     }
// }
// getData();

// get multiple docs(multiple users)
// const queryDocs = async () => {
//     const users = query(
//         collection(db, 'users'),
//         limit(10)
//     );

    // onSnapshot(users, (querySnapshot) => {
    //     console.log(JSON.stringify(querySnapshot.docs.map((e) => e.data())))
    // })
//     const querySnapshot = await getDocs(users);
//     querySnapshot.forEach((snap) => {
//         console.log(snap.id, JSON.stringify(snap.data()))
//     })
// }
// queryDocs();

export default db;