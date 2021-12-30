<template>
  <div id="app">
    <div id="tab-notes" class="tab" :class="notesTabClass">
      <NotesHeader @onCreate="freshNotes"></NotesHeader>
      <NotesList @freshNotes="freshNotes" v-bind:aNotes="this.notes" ref="list"> </NotesList>
      <br><br><br><br><br><br><br>
    </div>

    <div id="tab-user" class="tab" :class="userTabClass">
      <UserHeader></UserHeader>
      <AccountPage v-bind:accountDetails="this.account"></AccountPage>
    </div>

    <Navigation @changedTab="switchTab"></Navigation>
  </div>
</template>

<script>
import Vue from "vue";
import VueRouter from "vue-router";
import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";

// Custom Components
import NotesHeader from "../components/NotesHeader";
import UserHeader from "../components/UserHeader";
import AccountPage from "../components/AccountPage";
import Navigation from "../components/Navigation";
import NotesList from "../components/NotesList";

Vue.use(Vuesax);
Vue.use(VueRouter);

export default {
  name: "App",
  components: { Navigation, NotesHeader, NotesList, UserHeader, AccountPage },
  data() {
    return {
      notesTabClass: "",
      userTabClass: "hidden",
      notes: [],
      account: undefined,
    };
  },
  mounted() {
    this.freshNotes()
  },
  methods: {
    async freshNotes() {
      const db = this.$firebase.firestore();
      const user = this.$store.state.user;

      const doc = await db.collection('users').doc(user.uid).get()
      this.notes = doc.data().notes;
      this.account = doc.data()
    },

    switchTab(event) {
      this.notesTabClass = "hidden";
      this.userTabClass = "hidden";
      this[event + "TabClass"] = "";
    },
  },
};
</script>

<style scoped>
.hidden {
  display: none;
}

.tab {
  padding: 24px;
}
</style>
