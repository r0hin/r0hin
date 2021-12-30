import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";
import * as firebase from "firebase";
import router from "./router";

Vue.config.productionTip = false;

Vue.use(Vuex);
Vue.use(firebase);

const store = new Vuex.Store({
  state: {
    user: undefined,
  },
  mutations: {
    updateUser(state, data) {
      state.user = data;
    },
  },
});

const app = new Vue({
  router,
  render: (h) => h(App),
});

const firebaseConfig = {
  apiKey: "AIzaSyCWFxIICA104LdZMHCOxga8tsQuPptOr3w",
  authDomain: "eonnotes-b41e7.firebaseapp.com",
  projectId: "eonnotes-b41e7",
  storageBucket: "eonnotes-b41e7.appspot.com",
  messagingSenderId: "529864517069",
  appId: "1:529864517069:web:f6a1853ec4ee7b5fa65084"
};

firebase.initializeApp(firebaseConfig);
Vue.prototype.$firebase = firebase;
Vue.prototype.$store = store;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    store.commit("updateUser", user);
    app.$mount("#app");
    router.push("/app").catch(() => {});
  } else {
    // User is not signed in
    app.$mount("#app");
    router.push("/").catch(() => {});
  }
});
