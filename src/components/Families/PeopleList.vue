<template>
<div>
  <v-expansion-panel focusable>
    <v-expansion-panel-content v-for="guest in guests" :key="guest.id">
      <div slot="header">
        
        <span class="rsvp-icon-container" v-if="guest.rsvp===true">
          <v-icon color="success">check_circle</v-icon>  Yes
        </span>
        <span class="rsvp-icon-container" v-else-if="guest.rsvp===false">
          <v-icon color="red">cancel</v-icon>  No
        </span>
        <span class="rsvp-icon-container" v-else>
          <v-icon color="info">mail</v-icon>  Waiting
        </span>
        <strong class="body-2s">{{guest.name}}</strong>
      </div>
      <v-card>
        <v-card-text>
          <p v-if="guest.email">Email: <a :href="`mailto:${guest.email}`">{{guest.email}}</a></p>
          <p v-if="guest.phone">Phone: {{guest.phone}}</p>
          <p v-if="guest.restrictions">Restrictions: {{guest.restrictions}}</p>
          <p v-if="guest.song">Song: {{guest.song}}</p>
          <p v-if="guest.comment">Comment: {{guest.comment}}</p>
          <v-btn outline small color="info" @click="openEditDialog(guest)">Edit</v-btn>
        </v-card-text>
      </v-card>
    </v-expansion-panel-content>
  </v-expansion-panel>
  </div>
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
  firestore() {
    return {
      // FIXME: Below is the preferred query type, using the /family/guests array of guestIds
      // It currently throws 'document.onSnapshot is not a function'
      // It is a more optimized query (IDs known, vs. query on familyId)
      // guests: this.guestIds.map(id => db.collection('guests').doc(id))
      guests: db.collection("guests").where("familyId", "==", this.familyId)
    };
  },
  methods: {
    openEditDialog(person) {
      this.$emit("openPersonEditDialog", person)
    }
  }
};
</script>

<style scoped>
#delete-dialog {
  max-width: 400px;
}
.rsvp-icon-container {
  display: inline-block;
  width: 100px;
}
</style>