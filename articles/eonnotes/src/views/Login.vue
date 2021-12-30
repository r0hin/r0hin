<template>
  <div class="home">
    <div class="center content-inputs">
      <div class="content-title">
        <h1>Welcome!</h1>
      </div>
      <form v-on:submit.prevent="login()">
        <vs-input primary v-model="value" placeholder="Email" />
        <br />
        <vs-input
          v-on:keyup.enter="login()"
          type="password"
          icon-after
          v-model="value2"
          placeholder="Password"
        >
          <template #icon>
            <i class="bx bx-lock-open-alt"></i>
          </template>
        </vs-input>
      </form>
      <br />
      <vs-alert
        v-bind:class="{ hidden: hideError, dangerwarning: true }"
        danger
      >
        <template #title>
          Error
        </template>
      </vs-alert>
      <div class="submitdiv">
        <vs-button class="signbtn" @click="login()">Login</vs-button>
        <vs-button class="signbtn" @click="signup()">Sign Up</vs-button>
      </div>
      <br />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";

Vue.use(Vuesax);
Vue.use(VueRouter);

export default {
  name: "Login",
  components: {},
  data() {
    return {
      value: "",
      value2: "",
      hideError: true,
      errorMessage: "",
    };
  },
  methods: {
    login() {
      const firebase = this.$firebase;

      if (!this.value || !this.value2) {
        this.hideError = false;
        this.errorMessage = "Fill out all fields.";
        return;
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(this.value, this.value2)
        .then(() => {})
        .catch((err) => {
          this.hideError = false;
          this.errorMessage = err.message;
        });
    },
    signup() {
      const firebase = this.$firebase;

      if (!this.value || !this.value2) {
        this.hideError = false;
        this.errorMessage = "Fill out all fields.";
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(this.value, this.value2)
        .then(() => {
          this.$router.push({ path: "/app" }).catch(() => {});
        })
        .catch((err) => {
          this.hideError = false;
          this.errorMessage = err.message;
        });
    },
  },
};
</script>

<style>
.dangerwarning {
  max-width: 300px;
}

.hidden {
  display: none;
}

.signbtn {
  display: inline-block;
}

.submitdiv {
  display: flex;
  align-items: center;
  justify-content: center;
}

.content-inputs {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 80%;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  border-radius: 24px;
  background-color: #f4f7f8;
}

.content-title {
  background-color: #eef2f6;
  width: 100%;
  text-align: center;
  border-radius: 24px;
  margin-bottom: 24px;
}
</style>
