<template>
  <div>
    <v-dialog id="edit-family-dialog" v-model="isOpenData" max-width="400px">
      <v-card>
        <v-card-title>
          <h4>Editing {{this.family.name}}</h4>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="updateFamilyNameInput"
            append-icon="edit"
            label="Display Name"
            hide-details
            :placeholder="this.family.name"
            @keyup.enter="updateFamily"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn small outline color="error" @click="deleteDialogIsOpen=true">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn small outline color="primary" @click="close">Cancel</v-btn>
          <v-btn small color="primary" @click="updateFamily">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog id="delete-family-dialog" v-model="deleteDialogIsOpen" max-width="300px">
      <v-card>
        <v-card-title>
          <h4 class="subheading">Really delete {{this.family.name}}?</h4>
        </v-card-title>
        <v-card-text>
          This cannot be undone
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small outline color="primary" @click="deleteDialogIsOpen=false">Cancel</v-btn>
          <v-btn small color="error" @click="deleteFamily">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      :timeout="6000"
      color="error"
      v-model="errorSnackbarIsOpen"
    >
      {{ errorSnackbarMessage }}
      <v-btn dark flat @click.native="errorSnackbarIsOpen=false">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  import { db } from "../../main.js";
  export default {
    props: ['isOpenProp', 'family'],
    data() {
      return {
        updateFamilyNameInput: '',
        isOpenData: false,
        deleteDialogIsOpen: false,
        errorSnackbarIsOpen: false,
        errorSnackbarMessage: ''
      }
    },
    watch: {
      // Note: These 'coupled' watchers are used because v-dialog does not
      // yet expose a '@close' event for mutating the parent prop, eg. when
      // dialog is closed by clicking *outside* the dialog
      isOpenProp(val) {
        this.isOpenData = val
      },
      isOpenData(val) {
        this.$emit('update:isOpenProp', val)
        if (val == false) {
          this.updateFamilyNameInput = ''
        }
      }
    },
    methods: {
      updateFamily() {
        if (this.updateFamilyNameInput != '') {
          db.collection('families').doc(this.family.id).set({
            name: this.updateFamilyNameInput
          }, {merge: true})
        }
        this.close()
        this.updateFamilyNameInput = ''
      },
      close() {
        this.$emit('close')
        this.updateFamilyNameInput = ''
      },
      deleteFamily() {
        // Lazy-check whether the family is empty
        // Better(?) solution for scale: https://stackoverflow.com/questions/46554091/firebase-firestore-collection-count
        db.collection("guests").where('familyId', '==', this.family.id).get().then((snap) => {
          if (snap.empty) {
            db.collection("families").doc(this.family.id).delete().then(() => {
              this.deleteDialogIsOpen = false;
              this.close()
            })
          } else {
            this.errorSnackbarIsOpen = true
            this.errorSnackbarMessage = `Error: "${this.family.name}" still has ${snap.size} members. Please delete them first`
            this.deleteDialogIsOpen = false;
          }
        })

      }
    },
  }
</script>

<style scoped>

</style>