<template>
  <div>
    <span v-for="rsvp in rsvps" :key="rsvp.id" :title="rsvp.name">
      <v-icon v-if="rsvp.value==='REQUEST_INVITE'" color="blue lighten-4 ">mail</v-icon>
      <v-icon v-else-if="rsvp.value==='EARLY_REJECT'" color="red">highlight_off</v-icon>
      <v-icon v-else-if="rsvp.value==='REJECT'" color="red">cancel</v-icon>
      <v-icon v-else-if="rsvp.value==='ACCEPT'" color="green">check_circle</v-icon>
      <v-icon v-else color="grey lighten-2">help</v-icon>
    </span>
  </div>
</template>

<script>
  export default {
    name: 'FamilyRSVPs',
    props: ['family'],
    computed: {
      rsvps () {
        let guests = this.family.familyGuests
        return guests.map(guest => {
          return {
            id: guest.id,
            name: guest.name,
            value: guest.rsvp
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
