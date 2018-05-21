<template>
  <div>
    <v-data-table :headers="headers" :items="guests" hide-actions hide-headers dark>
      <tr>
        <td>Extra row here</td>
      </tr>
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
    filters: {
      rsvpText(status) {
        return status === undefined ? 'No response' : (
          status === true ? 'Yes' : 'No'
        )
      }
    },
    props: ['familyId', 'guestIds'],
    firestore() {
      return {
        // FIXME: Below is the preferred query type, using the /family/guests array of guestIds
        // It currently throws 'document.onSnapshot is not a function'
        // It is a more optimized query (IDs known, vs. query on familyId)
        // guests: this.guestIds.map(id => db.collection('guests').doc(id))
        guests: db.collection('guests').where('family', '==', this.familyId)
      }
    }
  }
</script>

<style scoped>

</style>