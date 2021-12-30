<template>
  <div id="accountPage">
  </div>
</template>

<script>
import Vue from "vue";
import Vuesax from "vuesax";
import Vuex from "vuex";

Vue.use(Vuesax);
Vue.use(Vuex);

export default {
  name: "AccountPage",
  data() {
    return {
      // notes: [],
    };
  },
  mounted() {
  },
  components: { },
  props: ['accountDetails'],
  methods: {
  },
};
</script>

<style scoped>

</style>
