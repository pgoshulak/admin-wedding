<template>
  <v-dialog id="edit-family-name-dialog" v-model="isOpenData" max-width="400px" @close="alert('closed')">
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
        <v-spacer></v-spacer>
        <v-btn small outline color="primary" @click="close">Cancel</v-btn>
        <v-btn small color="primary" @click="updateFamily">Save</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { db } from "../../main.js";
  export default {
    props: ['isOpenProp', 'family'],
    data() {
      return {
        updateFamilyNameInput: '',
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
          this.updateFamilyNameInput = ''
        }
      }
    },
    methods: {
      updateFamily() {
        if (this.updateFamilyNameInput != '') {
          db.collection('families').doc(this.family.id).set({
            name: this.updateFamilyNameInput
          })
        }
        this.close()
        this.updateFamilyNameInput = ''
      },
      close() {
        this.$emit('close')
        this.updateFamilyNameInput = ''
      }
    },
  }
</script>

<style scoped>

</style>