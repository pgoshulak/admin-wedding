<template>
  <div>
    <FamiliesAdd></FamiliesAdd>
    
    <v-data-table :headers="headers" :items="families">
      
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{props.item.name}}</td>
          <td>{{props.item.streetAddress}}</td>
        </tr>
      </template>

      <template slot="expand" slot-scope="props">
        <FamiliesAdd :family="props.item" :familyId="props.item.id"></FamiliesAdd>
      </template>


    </v-data-table>

    <!-- <FamiliesItem v-for="family in families" :key="family.id" :family="family"></FamiliesItem> -->

    
      
  </div>
</template>

<script>
import { db } from "../../main.js";
import FamiliesAdd from './FamiliesAdd'
import FamiliesItem from './FamiliesItem'

const familiesRef = db.collection('families')

export default {
  data() {
    return {
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
      families: familiesRef
    };
  },
  components: {
    FamiliesAdd,
    FamiliesItem
  }
};
</script>

<style scoped>
</style>