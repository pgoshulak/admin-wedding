<template>
  <div>
    <v-card-title>
      Families
      <v-spacer></v-spacer>
      <v-text-field
        v-model="newFamily"
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
        <People :familyId="props.item.id" :guestIds="props.item.guests"></People>
      </template>

    </v-data-table>

  </div>
</template>

<script>
import { db } from "../../main.js";
import FamiliesAdd from './FamiliesAdd'
import FamiliesItem from './FamiliesItem'
import People from './People'

const familiesRef = ''

export default {
  data() {
    return {
      newFamily: '',
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
        name: this.newFamily
      }).then(() => {
        this.newFamily = ''
      })
    }
  },
  components: {
    FamiliesAdd,
    FamiliesItem,
    People
  }
};
</script>

<style scoped>
</style>