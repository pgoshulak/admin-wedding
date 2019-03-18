<template>
<div>
  <v-expansion-panel focusable>
    <v-expansion-panel-content v-for="guest in guests" :key="guest.id">
      <div slot="header">

        <span class="rsvp-icon-container" v-if="guest.rsvp==='REQUEST_INVITE'">
          <v-icon color="info">mail</v-icon>  Send Invite
        </span>
        <span class="rsvp-icon-container" v-else-if="guest.rsvp==='EARLY_REJECT'">
          <v-icon color="red">cancel</v-icon>  Early Reject
        </span>
        <span class="rsvp-icon-container" v-else-if="guest.rsvp==='ACCEPT'">
          <v-icon color="success">check_circle</v-icon>  Accept
        </span>
        <span class="rsvp-icon-container" v-else-if="guest.rsvp==='REJECT'">
          <v-icon color="red">cancel</v-icon>  Reject
        </span>
        <span class="rsvp-icon-container" v-else>
          <v-icon color="grey">help</v-icon>  Waiting
        </span>
        <strong class="body-2s">{{guest.name}}</strong>
        <span class="ml-5">{{guest.restrictions}}</span>
        <span class="ml-5">{{guest.comment}}</span>
      </div>
      <v-card>
        <v-card-text>
          <p v-if="guest.email">Email: <a :href="`mailto:${guest.email}`">{{guest.email}}</a></p>
          <p v-if="guest.phone">Phone: {{guest.phone}}</p>
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
  props: ["familyId", "guests"],
  data() {
    return {
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
