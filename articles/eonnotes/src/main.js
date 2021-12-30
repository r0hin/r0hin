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
  apiKey: "AIzaSyBi2Vg9UQfkK7y7FEmEb4oySB0loDFNg0M",
  authDomain: "eonnote-78e57.firebaseapp.com",
  databaseURL: "https://eonnote-78e57.firebaseio.com",
  projectId: "eonnote-78e57",
  storageBucket: "eonnote-78e57.appspot.com",
  messagingSenderId: "424859217085",
  appId: "1:424859217085:web:c6894536bbad6254fa5bd4",
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
