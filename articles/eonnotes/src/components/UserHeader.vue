<template>
  <div id="userHeader">
  
    <vs-button class="newNote" flat>
      <i class="bx bx-message-square-add"></i>
      Edit Profile
    </vs-button>

    <h1>Account</h1>
  </div>
</template>

<script>
import Vue from "vue";
import Vuesax from "vuesax";
import Vuex from "vuex";

Vue.use(Vuesax);
Vue.use(Vuex);

export default {
  name: "UserHeader",
  data() {
    return {

    };
  },
  props: [],
  methods: {
  },
};
</script>

<style scoped>
.btnCenter {
  margin-top: 12px;
  display: flex;
  justify-content: center;
}

.cenetered {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

h1 {
  margin: 0px;
}

.newNote {
  float: right;
}

.newNote i {
  margin-right: 8px;
}

</style>
