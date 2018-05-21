<template>
  <div>
    <v-card-title>
      Families
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
          <td>{{props.item.guests && props.item.guests.length}}</td>
          <td>{{props.item.streetAddress}}</td>
        </tr>
      </template>

      <template slot="expand" slot-scope="props">
        <!-- <FamiliesAdd :family="props.item" :familyId="props.item.id"></FamiliesAdd> -->
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
      search: '',
      families: [],
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Guests',
          value: 'guests.length'
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
  components: {
    FamiliesAdd,
    FamiliesItem,
    People
  }
};
</script>

<style scoped>
</style>