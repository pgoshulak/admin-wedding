<template>
  <div>
    {{family.name}} Family
    <PeopleAdd :familyId="family.id"></PeopleAdd>
    <PeopleList :familyId="family.id"></PeopleList>
  </div>
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
</style>