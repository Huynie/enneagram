import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from "./store";
import { auth } from './firebase/firebaseInit';
import { onAuthStateChanged } from 'firebase/auth';

// Triggers when logged in or signed out
onAuthStateChanged(auth, (user) => {
  createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
  if(user) {
    store.dispatch("getCurrentUser");
  };
});

