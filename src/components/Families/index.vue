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

    <FamilyEditDialog
      :isOpenProp.sync="familyEditDialogOpen"
      :family="familyToEdit"
      @close="closeFamilyEditDialog"
    ></FamilyEditDialog>
  </div>
</template>

<script>
import { db } from "../../main.js";
import FamilyDetail from './FamilyDetail'
import FamilyEditDialog from './FamilyEditDialog'

const familiesRef = ''

export default {
  data() {
    return {
      familyEditDialogOpen: false,
      familyToEdit: {},
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
      console.log('index > openFamilyEditDialog', family.id)
      this.familyEditDialogOpen = true
      this.familyToEdit = family
    },
    closeFamilyEditDialog() {
      this.familyEditDialogOpen = false
    }
    
  },
  components: {
    FamilyDetail,
    FamilyEditDialog
  }
};
</script>

<style scoped>
</style>