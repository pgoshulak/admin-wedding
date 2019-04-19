<template>
  <div>
    <v-layout row wrap>
      <v-flex md3 sm6 xs12 v-for="group in guestGroups" :key="group.title">
        <v-card>
          <v-card-title class="title">{{group.title}}</v-card-title>
          <v-card-text class="text-xs-left">
            <table>
              <tr>
                <td class="table-label">Individuals</td>
                <td class="table-value">{{group.guests.length}}</td>
              </tr>
              <tr>
                <td class="table-label">Adults</td>
                <td class="table-value">{{breakdown(group.guests).ADULTS}}</td>
              </tr>
              <tr>
                <td class="table-label">Children (4-12)</td>
                <td class="table-value">{{breakdown(group.guests).CHILDREN}}</td>
              </tr>
              <tr>
                <td class="table-label">Toddlers (0-3)</td>
                <td class="table-value">{{breakdown(group.guests).TODDLERS}}</td>
              </tr>
              <tr>
                <td class="table-label">Vendors</td>
                <td class="table-value">{{breakdown(group.guests).VENDORS}}</td>
              </tr>
              <tr>
                <td class="table-label pt-3">Total headcount</td>
                <td class="table-value pt-3">{{headCount(breakdown(group.guests))}}</td>
              </tr>
            </table>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    Response rate: <strong class="mr-4">{{responseRate}} %</strong>
    Anticipated headcount: <strong>{{headCount(anticipatedBreakdown)}}</strong>
  </div>
</template>

<script>
export default {
  name: 'GuestCount',
  props: ['guests'],
  computed: {
    allGuests () {
      return this.guests
    },
    confirmedGuests () {
      return this.guests.filter(g => g.rsvp === 'ACCEPT')
    },
    rejectedGuests () {
      return this.guests.filter(g => g.rsvp === 'REJECT')
    },
    awaitedGuests () {
      return this.guests.filter(g => g.rsvp !== 'ACCEPT' && g.rsvp !== 'REJECT')
    },
    guestGroups () {
      return [
        {title: 'All invited guests', guests: this.allGuests},
        {title: 'Accepted invite', guests: this.confirmedGuests},
        {title: 'Rejected invite', guests: this.rejectedGuests},
        {title: 'Awaiting response', guests: this.awaitedGuests},
      ]
    },
    responseRate () {
      let totalAccepted = this.confirmedGuests.length
      let totalResponses = this.confirmedGuests.length + this.rejectedGuests.length
      let rate = totalAccepted / totalResponses
      return Math.round(1000*rate) / 10
    },
    anticipatedBreakdown () {
      let getResponseRate = (type) => {
        let accepted = this.breakdown(this.confirmedGuests)[type]
        let rejected = this.breakdown(this.rejectedGuests)[type]
        return accepted / (accepted + rejected)
      }
      let adultsInvited = this.breakdown(this.allGuests).ADULTS
      let adultsResponseRate = getResponseRate('ADULTS')
      let childrenInvited = this.breakdown(this.allGuests).CHILDREN
      let childrenResponseRate = getResponseRate('CHILDREN')
      let toddlersInvited = this.breakdown(this.allGuests).TODDLERS
      let toddlersResponseRate = getResponseRate('TODDLERS')
      let vendorsInvited = this.breakdown(this.allGuests).VENDORS
      let vendorsResponseRate = 1.0

      return {
        ADULTS: Math.round(10 * adultsInvited * adultsResponseRate) / 10,
        CHILDREN: Math.round(10 * childrenInvited * childrenResponseRate) / 10,
        TODDLERS: Math.round(10 * toddlersInvited * toddlersResponseRate) / 10,
        VENDORS: Math.round(10 * vendorsInvited * vendorsResponseRate) / 10
      }
    }
  },
  methods: {
    breakdown (guests) {
      return {
        ADULTS: guests.filter(g => !g.type).length,
        CHILDREN: guests.filter(g => g.type === 'CHILD').length,
        TODDLERS: guests.filter(g => g.type === 'TODDLER').length,
        VENDORS: guests.filter(g => g.type === 'VENDOR').length
      }
    },
    headCount (breakdown) {
      return breakdown.ADULTS + breakdown.CHILDREN * 0.5 + breakdown.VENDORS * 0.5
    }
  }
}
</script>

<style lang="scss" scoped>
.table-label {
  padding-right: 10px;
}
.table-value {
  font-weight: bold;
}
</style>
