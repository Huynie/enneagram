import { createStore } from "vuex";
import db, { auth } from '../firebase/firebaseInit';
import { doc, getDoc, setDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore/lite";

const store = createStore({
  state() {
      return {
        user: null,
        profileAdmin: null,
        email: "...Loading",
        firstName: "...Loading",
        lastName: "...Loading",
        id: null,
        initials: "...",
        descriptions: require('../../types.json'),
        results: null,
        core: 0,
        lows: [],
        highs: [],
      }
  },
  // used to change or filter data from state before
  // making them available for components.
  getters: {

  },
  // No Async Allowed
  // Can change data in state.
  // Mutations are to be 'commited' when triggered.
  mutations: {
    setProfileInfo(state, userData) {
      state.id = userData.id;
      state.email = userData.email;
      state.firstName = userData.firstName;
      state.lastName = userData.lastName;
      state.userName = userData.username;
      state.initials = userData.firstName.charAt(0) + userData.lastName.charAt(0);
      state.results = userData.results.reverse();

      const latestScore = [...state.results[0].score];

      //GET TOP 2 HIGHEST TYPE EXCLUDING CORE TYPE
      const highNums = latestScore.sort((a,b) => b-a).slice(0,3);
      highNums.forEach((num) => {
          state.highs.push(state.results[0].score.indexOf(num) + 1);
      });

      //GET 2 LOWEST TYPE
      const lowNums = latestScore.sort((a,b) => a-b).slice(0,2);
      lowNums.forEach((num) => {
          state.lows.push(state.results[0].score.indexOf(num) + 1);    
      });
      
      // Set Core Type
      state.core = state.highs[0] - 1;
    },
    setDeletedResult(state, index) {
      state.results.splice(index, 1);
    },
    setAddedResult(state, result) {
      state.results.push(result);
      console.log(state.results);
    }
  },
  // Methods that can access data in state ,but can't change them.
  // To change data, actions must commit a mutation to do so.
  // Aync is allowed.
  // Actions are to be 'dispatched' when triggered.
  actions: {
   async getCurrentUser({commit}) {
      const userDataBase = doc(db,`users/${auth.currentUser.uid}`);
      try{
      //  const doc = await getDoc(userDataBase);
      //  const userData = doc.data();
        commit("setProfileInfo", (await getDoc(userDataBase)).data());
      } catch (error) {
        console.log(error);
      }
   },
    async deleteResult({commit, state}, index) {
      const user = doc(db, `users/${auth.currentUser.uid}`);
      try {
          await updateDoc(user, { results: arrayRemove(state.results[index]) });
          commit("setDeletedResult", index);
      } catch (err) {
          console.log(err);
      }
    },
    async saveResults({commit, dispatch}, score) {
      const dataBase = doc(db, `users/${auth.currentUser.uid}`);
      const newResult = { "date/time": new Date(), score: score };
      const addData = arrayUnion( newResult );
      try {
          await setDoc(dataBase,{ results: addData},{ merge: true });
          dispatch("getCurrentUser");
          // commit("setAddedResult", newResult);
          console.log("saved to firebase");
      } catch (err) {
          console.log(err);
      }
    }
  },
  // Breaks the store out to multiple modules
  modules: {},
});

export default store;