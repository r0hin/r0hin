import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login.vue";
import App from "../views/App.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/app",
    name: "App",
    component: App,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
