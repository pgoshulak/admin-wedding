<template>
  <tr @click="expanded = !expanded">
    <td>{{family.name}}</td>
    <td>{{family.streetAddress}}</td>
  </tr>
</template>

<script>
  export default {
    props: ['family', 'expanded']
  }
</script>

<style scoped>

</style>