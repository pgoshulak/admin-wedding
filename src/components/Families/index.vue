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
          @openPersonEditDialog="openPersonEditDialog"
        ></FamilyDetail>
      </template>

    </v-data-table>

    <FamilyEditDialog
      :isOpenProp.sync="familyEditDialogOpen"
      :family="familyToEdit"
      @close="closeFamilyEditDialog"
    ></FamilyEditDialog>
    <PersonEditDialog
      :isOpenProp.sync="personEditDialogOpen"
      :person="personToEdit"
      @close="closePersonEditDialog"
    ></PersonEditDialog>
  </div>
</template>

<script>
import { db } from "../../main.js";
import FamilyDetail from './FamilyDetail'
import FamilyEditDialog from './FamilyEditDialog'
import PersonEditDialog from './PersonEditDialog'

const familiesRef = ''

export default {
  data() {
    return {
      familyEditDialogOpen: false,
      personEditDialogOpen: false,
      familyToEdit: {},
      personToEdit: {},
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
      this.familyEditDialogOpen = true
      this.familyToEdit = family
    },
    openPersonEditDialog(person) {
      console.log('-----person is ', person)
      this.personEditDialogOpen = true
      this.personToEdit = person
    },
    closeFamilyEditDialog() {
      this.familyEditDialogOpen = false
    },
    closePersonEditDialog() {
      this.personEditDialogOpen = false
    }
    
  },
  components: {
    FamilyDetail,
    FamilyEditDialog,
    PersonEditDialog
  }
};
</script>

<style scoped>
</style>