<template>
  <v-card class="family-detail elevation-8">
    <v-card-title primary-title>
    <h3 class="headline">{{family.name}} Family</h3>

    </v-card-title>
    <PeopleAdd :familyId="family.id"></PeopleAdd>
    <PeopleList :familyId="family.id"></PeopleList>
  </v-card>
</template>

<script>
import PeopleAdd from "./PeopleAdd";
import PeopleList from "./PeopleList";
export default {
  props: ["family"],
  components: {
    PeopleAdd,
    PeopleList
  }
};
</script>

<style scoped>
.family-detail {
  padding: 10px;
}
</style>