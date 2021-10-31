import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import { auth } from '@/firebase/firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';

onAuthStateChanged(auth, () => {
  createApp(App).use(router)
  .use(router)
  .use(store)
  .mount('#app');
});

