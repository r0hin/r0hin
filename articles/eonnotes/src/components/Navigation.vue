<template>
  <div class="nav">
    <div class="navitem">
      <vs-button @click="tabe('notes')" class="btno" :class="activeNotes">
        <i class="bx bxs-notepad"></i>
      </vs-button>
    </div>
    <div class="navitem">
      <vs-button @click="tabe('user')" class="btno" :class="activeUser">
        <i class="bx bxs-user-pin"></i>
      </vs-button>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import Vuesax from "vuesax";

Vue.use(Vuesax);

export default {
  name: "Navigation",
  data() {
    return {
      activeNotes: "",
      activeUser: "inactive",
    };
  },
  props: [],
  methods: {
    tabe(tab) {
      this.$emit("changedTab", tab);
      switch (tab) {
        case "notes":
          this.activeNotes = "";
          this.activeUser = "inactive";
          break;
        case "user":
          this.activeUser = "";
          this.activeNotes = "inactive";
          break;
        default:
          break;
      }
    },
  },
};
</script>

<style scoped>
.inactive {
  background-color: #ffffff;
  color: rgb(65, 65, 65);
}

.btno {
  width: 70%;
  padding: 6px;
  font-size: 18px;
}
.nav {
  position: fixed;
  bottom: 24px;
  left: 50%;
  transform: translate(-50%, 0);
  width: 90%;
  height: 90px;
  border-radius: 24px;
  background-color: rgba(255, 255, 255, 0.4);
  backdrop-filter: blur(10px);
  z-index: 4;
  box-shadow: 0px 8px 24px rgb(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: auto auto;
}

.navitem {
  display: inline-block;
  text-align: center;
  display: flex;

  justify-content: center;
  align-items: center;
}
</style>
