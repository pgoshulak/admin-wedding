<template>
  <div class="people-container">
    <v-form>
      <v-container text-xs-left>
        <v-layout row wrap>
          <v-flex xs5>
            <v-text-field
              v-model="newName"
              label="Name"
              required
            ></v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-text-field
              v-model="newEmail"
              label="E-mail"
            ></v-text-field>
          </v-flex>
          <v-flex xs2>
            <v-btn color="info" @click="submitNew"><v-icon>person_add</v-icon>&nbsp;Add</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>

    <v-data-table :headers="headers" :items="guests" hide-actions hide-headers>
      <template slot="items" slot-scope="props">
        <tr>
          <td>{{props.item.name}}</td>
          <td>{{props.item.rsvp | rsvpText}}</td>
          <td>{{props.item.email}}</td>
        </tr>
      </template>

    </v-data-table>
  </div>
</template>

<script>
import { db } from '../../main.js'
  export default {
    data() {
      return {
        newName: '',
        newEmail: '',
        guests: [],
        headers: [
          {
            text: 'Name',
            value: 'name'
          },
          {
            text: 'Email',
            value: 'email'
          }
        ]
      }
    },
    computed: {
      newId() {
        return this.newName.split(' ').reverse().join('-').toLowerCase()
      }
    },
    filters: {
      rsvpText(status) {
        return status === undefined ? 'No response' : (
          status === true ? 'Yes' : 'No'
        )
      }
    },
    props: ['familyId', 'guestIds'],
    methods: {
      submitNew() {
        if (this.newName) {
          db.collection('guests').add({
            name: this.newName,
            email: this.newEmail,
            family: this.familyId
          }).then(() => {
            this.newName = ''
            this.newEmail = ''
          })
        }
      }
    },
    firestore() {
      return {
        // FIXME: Below is the preferred query type, using the /family/guests array of guestIds
        // It currently throws 'document.onSnapshot is not a function'
        // It is a more optimized query (IDs known, vs. query on familyId)
        // guests: this.guestIds.map(id => db.collection('guests').doc(id))
        guests: db.collection('guests').where('family', '==', this.familyId)
      }
    },
  }
</script>

<style scoped>
.people-container {
  padding: 10px;
  background-color: lightblue;
}

</style>