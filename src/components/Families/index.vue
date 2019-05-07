<template>
  <div>
    <pre class="text-xs-left">{{pageUrl}}</pre>
    <GuestCount :guests="guests" />
    <v-card-title>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="newFamilyNameInput"
        append-icon="group_add"
        label="Add Family"
        hide-details
        @keyup.enter="addNewFamily"
      ></v-text-field>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>

    </v-card-title>

    <v-data-table
      :headers="headers"
      :items="familiesWithGuests"
      :search="search"
      :rows-per-page-items="[-1]"
      ref="dataTable"
      >

      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{props.item.name}}</td>
          <td><FamilyRSVPs :family="props.item"/></td>
          <td>{{props.item.streetAddress}}</td>
        </tr>
      </template>

      <template slot="expand" slot-scope="props">
        <FamilyDetail
          :family="props.item"
          @closeDetailView="props.expanded = false"
          @openFamilyEditDialog="openFamilyEditDialog"
          @openPersonEditDialog="openPersonEditDialog"
        ></FamilyDetail>
      </template>

    </v-data-table>

    <FamilyEditDialog
      :isOpenProp.sync="familyEditDialogOpen"
      :family="familyToEdit"
      @close="closeFamilyEditDialog"
    ></FamilyEditDialog>
    <PersonEditDialog
      :isOpenProp.sync="personEditDialogOpen"
      :person="personToEdit"
      @close="closePersonEditDialog"
    ></PersonEditDialog>
  </div>
</template>

<script>
import { db } from "../../main.js";
import FamilyDetail from './FamilyDetail'
import FamilyEditDialog from './FamilyEditDialog'
import PersonEditDialog from './PersonEditDialog'
import FamilyRSVPs from './FamilyRSVPs'
import GuestCount from './GuestCount'
import { pageUrl } from '../../../secrets.js'

const familiesRef = ''

export default {
  data() {
    return {
      familyEditDialogOpen: false,
      personEditDialogOpen: false,
      familyToEdit: {},
      personToEdit: {},
      newFamilyNameInput: '',
      search: '',
      families: [],
      guests: [],
      headers: [
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'RSVP',
          value: null
        },
        {
          text: 'Address',
          value: 'streetAddress'
        }
      ],
      pageUrl: pageUrl || 'Add pageUrl as export from /secrets.js'
    };
  },
  firestore() {
    return {
      families: db.collection('families'),
      guests: db.collection('guests')
    };
  },
  computed: {
    familiesWithGuests () {
      return this.families.map(family => {
        let familyGuests = this.guests.filter(g => g.familyId === family.id)
        return {
          ...family,
          id: family.id,
          familyGuests
        }
      })
    }
  },
  methods: {
    addNewFamily() {
      db.collection('families').add({
        name: this.newFamilyNameInput
      }).then(res => {
        // Auto-expand the new family's entry to quickly add new guests
        this.search = this.newFamilyNameInput
        let newFamilyId = res.id
        this.$refs.dataTable.expanded[newFamilyId] = true

        this.newFamilyNameInput = ''
      })
    },
    openFamilyEditDialog(family) {
      this.familyEditDialogOpen = true
      this.familyToEdit = family
    },
    openPersonEditDialog(person) {
      this.personEditDialogOpen = true
      this.personToEdit = person
    },
    closeFamilyEditDialog() {
      this.familyEditDialogOpen = false
    },
    closePersonEditDialog() {
      this.personEditDialogOpen = false
    },
    log(thing) {
      console.log(thing)
    }

  },
  components: {
    FamilyDetail,
    FamilyEditDialog,
    FamilyRSVPs,
    GuestCount,
    PersonEditDialog
  }
};
</script>

<style scoped>
</style>
