<template>
  <v-expansion-panel focusable>
    <v-expansion-panel-content v-for="guest in guests" :key="guest.id">
      <div slot="header">
        {{guest.name}} - {{guest.rsvp | rsvpText}}
      </div>
      <v-card>
        <v-card-text>
          <p v-if="guest.email">Email: <a :href="`mailto:${guest.email}`">{{guest.email}}</a></p>
          <p v-if="guest.phone">Phone: {{guest.phone}}</p>
          <p v-if="guest.restrictions">Restrictions: {{guest.restrictions}}</p>
          <p v-if="guest.song">Song: {{guest.song}}</p>
          <p v-if="guest.comment">Comment: {{guest.comment}}</p>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { db } from "../../main.js";
export default {
  props: ["familyId"],
  data() {
    return {
      guests: [],
      headers: [
        {
          text: "Name",
          value: "name"
        },
        {
          text: "Email",
          value: "email"
        }
      ]
    };
  },
  filters: {
    rsvpText(status) {
      return status === undefined
        ? "No response"
        : status === true ? "Yes" : "No";
    }
  },
  firestore() {
    return {
      // FIXME: Below is the preferred query type, using the /family/guests array of guestIds
      // It currently throws 'document.onSnapshot is not a function'
      // It is a more optimized query (IDs known, vs. query on familyId)
      // guests: this.guestIds.map(id => db.collection('guests').doc(id))
      guests: db.collection("guests").where("family", "==", this.familyId)
    };
  }
};
</script>

<style scoped>
</style>