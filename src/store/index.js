import { createStore } from "vuex";
import db, { auth } from '../firebase/firebaseInit';
import { doc } from "firebase/firestore/lite";

const store = createStore({
  state() {
      return {
        user: null,
        profileAdmin: null,
        profileEmail: null,
        profileFirstName: null,
        profileLastName: null,
        profileUsername: null,
        profileId: null,
        profileInitials: null,
      }
  },
  getters: {

  },
  mutations: {
    setProfileInfo(state, doc) {
        state.profileId = doc.id;
        state.profileEmail = doc.data().email;
        state.profileFirstName = doc.data().firstName;
        state.profileLastName - doc.data().lastName;
        state.profileUserName - doc.data().username;
    },
    setProfileInitials() {

    },
    updateUser(state, payload) {
        state.user = payload;
    }
  },
  actions: {
   async getCUrrentUser({commit}) {
       const userDataBase = doc(db,`users/${auth.currentUser.uid}`);
       const dbResults = await userDataBase.get();
       commit("setProfileInfo", dbResults);
       commit("setProfileInitials");
       console.log(dbResults);
   }
  },
  modules: {},
});

export default store;