<template>
  <div>
    <pre>
      {{families}}
    </pre>
  </div>
</template>

<script>
  import { db } from '../main.js'
  export default {
    data() {
      return {
        families: []
      }
    },
    firestore() {
      return {
        families: db.collection('families')
      }
    },
  }
</script>

<style scoped>

</style>