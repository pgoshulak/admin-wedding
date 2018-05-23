<template>
  <div>
    <v-card-title>
      Families
      <v-spacer></v-spacer>
      <v-text-field
        v-model="newFamilyNameInput"
        append-icon="group_add"
        label="Add Family"
        hide-details
        @keyup.enter="addNewFamily"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
   
    </v-card-title>

    <v-data-table :headers="headers" :items="families" :search="search">
      
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{props.item.name}}</td>
          <td>{{props.item.streetAddress}}</td>
        </tr>
      </template>

      <template slot="expand" slot-scope="props">
        <FamilyDetail 
          :family="props.item"
          @closeDetailView="props.expanded = false"
          @openFamilyEditDialog="openFamilyEditDialog"
        ></FamilyDetail>
      </template>

    </v-data-table>

    <v-dialog id="edit-family-name-dialog" v-model="familyEditDialog" max-width="400px">
      <v-card>
        <v-card-title>
          <h4>Editing {{familyToEdit.name}}</h4>
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="updateFamilyNameInput"
            append-icon="edit"
            label="Family Display Name"
            hide-details
            @keyup.enter="updateFamily"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn small outline color="primary" @click="familyEditDialog=false">Cancel</v-btn>
          <v-btn small color="primary" @click="updateFamily">Save</v-btn>
        </v-card-actions>
      </v-card>
  </v-dialog>

  </div>
</template>

<script>
import { db } from "../../main.js";
import FamilyDetail from './FamilyDetail'

const familiesRef = ''

export default {
  data() {
    return {
      familyEditDialog: false,
      familyToEdit: {},
      updateFamilyNameInput: '',
      newFamilyNameInput: '',
      search: '',
      families: [],
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Address',
          value: 'streetAddress'
        }
      ]
    };
  },
  firestore() {
    return {
      families: db.collection('families')
    };
  },
  methods: {
    addNewFamily() {
      db.collection('families').add({
        name: this.newFamilyNameInput
      }).then(() => {
        this.newFamilyNameInput = ''
      })
    },
    openFamilyEditDialog(family) {
      this.familyEditDialog = true
      this.familyToEdit = family
      this.updateFamilyNameInput = family.name
    },
    updateFamily() {
      if (this.updateFamilyNameInput != '') {
        db.collection('families').doc(this.familyToEdit.id).set({
          name: this.updateFamilyNameInput
        })
      }
      this.familyEditDialog = false
      this.updateFamilyNameInput = ''
    }
  },
  components: {
    FamilyDetail
  }
};
</script>

<style scoped>
</style>