<template>
  <div>
    <v-dialog id="edit-person-dialog" v-model="isOpenData" max-width="400px">
      <v-card>
        <v-card-title>
          <h4>Editing {{this.person.name}}</h4>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="updatePersonNameInput"
            append-icon="edit"
            label="Display Name"
            hide-details
            :placeholder="this.person.name"
            @keyup.enter="updatePerson"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn small outline color="error" @click="deleteDialogIsOpen=true">Delete</v-btn>
          <v-spacer></v-spacer>
          <v-btn small outline color="primary" @click="close">Cancel</v-btn>
          <v-btn small color="primary" @click="updatePerson">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog id="delete-person-dialog" v-model="deleteDialogIsOpen" max-width="300px">
      <v-card>
        <v-card-title>
          <h4 class="subheading">Really delete {{this.person.name}}?</h4>
        </v-card-title>
        <v-card-text>
          This cannot be undone
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small outline color="primary" @click="deleteDialogIsOpen=false">Cancel</v-btn>
          <v-btn small color="error" @click="deletePerson">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
  </div>
</template>

<script>
  import { db } from "../../main.js";
  export default {
    props: ['isOpenProp', 'person'],
    data() {
      return {
        updatePersonNameInput: '',
        isOpenData: false,
        deleteDialogIsOpen: false
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
          this.updatePersonNameInput = ''
        }
      }
    },
    methods: {
      updatePerson() {
        if (this.updatePersonNameInput != '') {
          db.collection('guests').doc(this.person.id).set({
            name: this.updatePersonNameInput
          }, {merge: true})
        }
        this.close()
        this.updatePersonNameInput = ''
      },
      close() {
        this.$emit('close')
        this.updatePersonNameInput = ''
      },
      deletePerson() {
        db.collection("guests").doc(this.person.id).delete().then(() => {
          this.deleteDialogIsOpen = false;
          this.close()
        })
      }
    },
  }
</script>

<style scoped>

</style>