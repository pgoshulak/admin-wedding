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
      Everyone listed below can RSVP together
    </v-card-text>
    <PeopleList :familyId="family.id"></PeopleList>
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