<template>
  <v-dialog id="edit-person-name-dialog" v-model="isOpenData" max-width="400px">
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
        <v-spacer></v-spacer>
        <v-btn small outline color="primary" @click="close">Cancel</v-btn>
        <v-btn small color="primary" @click="updatePerson">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { db } from "../../main.js";
  export default {
    props: ['isOpenProp', 'person'],
    data() {
      return {
        updatePersonNameInput: '',
        isOpenData: false
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
      }
    },
  }
</script>

<style scoped>

</style>