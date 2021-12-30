<template>
  <div id="notesHeader">
    <vs-dialog width="300px" not-center v-model="active3">
      <div class="cenetered">
        <h2>New Note</h2>
        <vs-input
          class="noteinput"
          v-model="noteinput"
          placeholder="Note Name"
        ></vs-input>
      </div>
      <div class="btnCenter">
        <vs-button
          @click="
            active3 = false;
            newNote();
          "
        >
          Ok
        </vs-button>
        <vs-button @click="active3 = false" transparent> Cancel </vs-button>
      </div>
    </vs-dialog>

    <vs-button @click="active3 = !active3" class="newNote" flat>
      <i class="bx bx-message-square-add"></i>
      New Note
    </vs-button>

    <h1>Notes</h1>
  </div>
</template>

<script>
import Vue from "vue";
import Vuesax from "vuesax";
import Vuex from "vuex";

Vue.use(Vuesax);
Vue.use(Vuex);

export default {
  name: "NotesHeader",
  data() {
    return {
      active3: false,
      noteinput: "",
    };
  },
  props: ["onCreate"],
  methods: {
    async newNote() {
      const db = this.$firebase.firestore();
      const user = this.$store.state.user;
      const docRef = await db
        .collection("users")
        .doc(user.uid)
        .collection("notes")
        .add({
          name: this.noteinput,
          status: true,
          content: "",
          timestamp: this.$firebase.firestore.FieldValue.serverTimestamp(),
        });
      await db
        .collection("users")
        .doc(user.uid)
        .set(
          {
            notes: this.$firebase.firestore.FieldValue.arrayUnion({
              name: this.noteinput,
              id: docRef.id,
            }),
          },
          { merge: true }
        );

      this.$vs.notification({
        color: "success",
        position: "top-right",
        title: "Success",
        text: `Your note, "${this.noteinput}" was created successfully.`,
      });

      this.noteinput = "";
      this.$emit("onCreate");
    },
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

.con-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
