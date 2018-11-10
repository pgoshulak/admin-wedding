<template>
  <v-card class="family-detail elevation-8">
    <v-card-title primary-title>

      <h3 class="headline family-name">
        {{family.name}}
        <v-icon class="edit-family-name" color="black" @click="openFamilyEditDialog">edit</v-icon>
      </h3>

      <v-spacer></v-spacer>

      <v-btn flat icon @click="closeDetailView">
        <v-icon>close</v-icon>
      </v-btn>

    </v-card-title>
    <v-card-text class="text-xs-left">
      {{address.streetAddress}}
      {{address.city}}
      {{address.province}}
      {{address.postalCode}}
      {{address.country}} <br/>
      Everyone listed below can RSVP together
    </v-card-text>
    <PeopleList
      :familyId="family.id"
      @openPersonEditDialog="openPersonEditDialog"
    ></PeopleList>
    <PeopleAdd :familyId="family.id"></PeopleAdd>

  </v-card>
</template>

<script>
import PeopleAdd from "./PeopleAdd";
import PeopleList from "./PeopleList";
export default {
  props: ["family"],
  methods: {
    closeDetailView() {
      this.$emit("closeDetailView")
    },
    openFamilyEditDialog() {
      this.$emit("openFamilyEditDialog", this.family)
    },
    openPersonEditDialog(data) {
      this.$emit("openPersonEditDialog", data)
    }
  },
  computed: {
    address() {
      let streetAddress = this.family.streetAddress || ''
      let city = this.family.city || ''
      let province = this.family.province || ''
      let country = this.family.country || ''
      let postalCode = this.family.postalCode || ''
      return {
        streetAddress,
        city,
        province,
        country,
        postalCode
      }
    }
  },
  components: {
    PeopleAdd,
    PeopleList
  }
};
</script>

<style scoped lang="scss">
.family-detail {
  padding: 10px;
}
.family-name .edit-family-name {
    opacity: 0;
    cursor: pointer;

}
.family-name:hover {
  & .edit-family-name {
    opacity: 0.5;
  }
  & .edit-family-name:hover {
    opacity: 1.0;
  }

}
</style>
