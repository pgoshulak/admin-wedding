<template>
  <div>
    <span v-for="rsvp in rsvps" :key="rsvp.id" :title="rsvp.tooltip" class="rsvp-box">

      <v-icon v-if="rsvp.value==='REQUEST_INVITE'" color="blue lighten-4 ">mail</v-icon>
      <v-icon v-else-if="rsvp.value==='EARLY_REJECT'" color="red">highlight_off</v-icon>
      <v-icon v-else-if="rsvp.value==='REJECT'" color="red">cancel</v-icon>
      <v-icon v-else-if="rsvp.value==='ACCEPT'" color="green">check_circle</v-icon>
      <v-icon v-else color="grey lighten-2">help</v-icon>

      <v-icon v-if="rsvp.restrictions" color="orange" small>restaurant</v-icon>
      <v-icon v-if="rsvp.comment" color="pink" small>mode_comment</v-icon>
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
          let id = guest.id
          let name = guest.name
          let value = guest.rsvp
          let comment = guest.comment
          let restrictions = guest.restrictions
          return {
            id,
            name,
            value,
            comment,
            restrictions,
            tooltip: `${name}${restrictions ? '\n' + restrictions : ''}${comment ? '\n' + comment : ''}`
          }
        })
      }
    }
  }
</script>

<style scoped>
.rsvp-box {
  border: 1px solid #ddd;
  padding: 8px 2px;
  margin: 0px;

  cursor: default;
}
.rsvp-box:hover {
  background-color: white;
}
</style>
