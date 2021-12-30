<template>
  <div>
    <vs-dialog width="300px" not-center v-model="active4">
      <div class="cenetered">
        <h2>New Description</h2>
        <vs-input
          class="noteinput"
          v-model="descinput"
          placeholder="Updated description"
        ></vs-input>
      </div>
      <div class="btnCenter">
        <vs-button @click=" active4 = false; updateDescription(); " >
          Update Description
        </vs-button>
        <vs-button @click="active4 = false" transparent> Cancel </vs-button>
      </div>
    </vs-dialog>

    <div class="fullNote animated faster" :class="{
      'hidden': hideFull,
      'fadeInUp': fullFadeTrue,
      'fadeOutDown': fullFadeFalse,
    }">
      <h1>{{ noteData.name }} <small class="conditional"><i v-if="saved" class="bx bx-check yei"></i>  <i v-else class="bx bx-cloud-upload nei"></i> {{saved ? 'Synced' : 'Saving...'}}</small></h1>
      <vs-button @click="closeNote" class="closeNote" danger flat>
        <i class="bx bx-message-alt-x"></i>
      </vs-button>

      <br> <br> <br> <br>

      <div :id="noteData.id + 'editor'"></div>
      <br> <br> <br> <br> <br> <br>

    </div>
    <vs-card @click="showNote" class="note_content">
      <template #title>
        <h3>{{ noteData.name }}</h3>
      </template>
      <template #text>
        <p>{{ noteData.preview }}</p>
      </template>
      <template #buttons>
        <vs-button @click="editDesc($event)" class="btn-chat" primary>
          <i class="bx bx-message-square-edit"></i>
        </vs-button>
      </template>
    </vs-card>
  </div>
</template>

<script>
import Vue from "vue";
import Vuesax from "vuesax";
import Vuex from "vuex";
import EditorJS from '@editorjs/editorjs';

Vue.use(Vuesax);
Vue.use(Vuex);

export default {
  name: "Note",
  data() {
    return {
      hideFull: true,
      fullFadeTrue: true,
      fullFadeFalse: false,
      dataGen: false,
      editor: null,
      saved: true,
      saveTimeout: null,
      active4: false,
      descinput: this.noteData.preview,
    };
  },
  props: ["noteData"],
  methods: {
    editDesc(e) {
      this.active4 = true;
      e.stopPropagation();
    },
    async updateDescription() {
      // Name is only for notification
      this.$emit("onDescriptionChange", {input: this.descinput, name: this.noteData.name, id: this.noteData.id})
    },
    async save(skipNotify) {
      const output = await this.editor.save()
      const database = this.$firebase.database();
      const user = this.$store.state.user;

      await database.ref(`users/${user.uid}/notes/${this.noteData.id}`).set({
        'content': output,
      });

      if (!skipNotify) {
        this.$vs.notification({
          color: "success",
          position: "top-right",
          title: "Saved",
          text: `${this.noteData.name} saved successfully.`,
        });
      }

      this.saved = true
    },
    editorsChanged() {
      clearTimeout(this.saveTimeout)
      this.saved = false
      this.saveTimeout = setTimeout(() => {
        this.save(true)
      }, 1200);

    },
    async showNote() {
      this.hideFull = false;
      this.fullFadeTrue = true;
      this.fullFadeFalse = false;

      if (!this.dataGen) {
        this.dataGen = true;
        const Header = require('@editorjs/header');
        const SimpleImage = require('@editorjs/simple-image');
        const Embed = require('@editorjs/embed');
        const CodeTool = require('@editorjs/code');
        const Quote = require('@editorjs/quote');
        const Marker = require('@editorjs/marker');

        // Generate database from firebase rtdb

        const database = this.$firebase.database();
        const user = this.$store.state.user;
        const snapshot = await database.ref(`users/${user.uid}/notes/` + this.noteData.id).once('value')
        const tools = {
          Marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M',
          },
          image: SimpleImage,
          header: {
            class: Header,
            config: {
              placeholder: 'Enter a header',
              levels: [1, 2, 3, 4, 5],
              defaultLevel: 3,
              inlineToolbar: true,
            }
          },
          embed: {
            class: Embed,
            config: {
              services: {
                "youtube": true,
                "codepen": true,
                "imgur": true,
                "gyfcat": true,
                "twitch-video": true,
                "twitch-channel": true,
                "coub": true,
                "twitter": true,
                "instagram": true,
              }
            }
          },
          code: CodeTool,
          quote: {
            class: Quote,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+O',
            config: {
              quotePlaceholder: 'Enter a quote',
              captionPlaceholder: 'Quote\'s author',
            },
          },
        }

        if (snapshot.val()) {
          this.editor = new EditorJS({
            holder: `${this.noteData.id}editor`,
            data: snapshot.val().content,
            tools: tools,
            logLevel: 'ERROR',
            onChange: this.editorsChanged,
          });
        }
        else {
          this.editor = new EditorJS({
            holder: `${this.noteData.id}editor`,
            tools: tools,
            placeholder: "Time to write ✏️ 😀...",
            logLevel: 'ERROR',
            onChange: this.editorsChanged,
          });
        }

        console.log(this.editor);

      }

    },
    closeNote() {
      this.fullFadeTrue = false;
      this.fullFadeFalse = true;
      
      setTimeout(() => {
        this.hideFull = true;
      }, 500);
    }
  },
};
</script>

<style scoped>
.conditional {
  margin-left: 64px;
  font-size: 18px;
}

.yei {
  color: lime;
  font-size: 28px;
  margin-top: 9px;
  margin-left: -32px;
  position: absolute
}

.nei {
  color: red;
  font-size: 28px;
  margin-top: 9px;
  margin-left: -32px;
  position: absolute
}

.hidden {
  display: none;
}

h1 {
  float: left;
  margin: 0px;
}

.closeNote {
  float: right;
  font-size: 18px;
}

.fullNote {
  position: fixed;
  width: 95.6%;
  height: 100%;
  left: 0px;
  top: 0px;
  background-color: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(10px);
  z-index: 2;
  padding: 24px;
  overflow-y: auto;
}

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
</style>
