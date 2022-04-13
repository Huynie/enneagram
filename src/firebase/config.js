// import * as firebase from 'firebase';
// import '@firebase/auth';
// import '@firebase/firestore';

// const firebaseConfig = {
//   apiKey: 'YOUR_KEY_HERE_AIzaSyAOWH',
//   authDomain: 'your-auth-domain-b1234.firebaseapp.com',
//   databaseURL: 'https://your-database-name.firebaseio.com',
//   projectId: 'your-project-id-1234',
//   storageBucket: 'your-project-id-1234.appspot.com',
//   messagingSenderId: '12345-insert-yourse',
//   appId: 'insert yours: 1:1234:web:ee873bd1234c0deb7eba61ce',
// };

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
// }

// export { firebase };

import {initializeApp} from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyCULs8RNL-aOMXhpBUrX7Mn7fyIov9h6Tc",
  authDomain: "en-gram.firebaseapp.com",
  projectId: "en-gram",
  storageBucket: "en-gram.appspot.com",
  messagingSenderId: "1096010449978",
  appId: "1:1096010449978:web:ce2c4b7cf9f955d3746103",
  measurementId: "G-K9KVYT5P2M"
  
});

export const db = getFirestore(firebaseApp);
// export const auth = getAuth(firebaseApp);
export const auth = initializeAuth(firebaseApp, { persistence: getReactNativePersistence(AsyncStorage) })
