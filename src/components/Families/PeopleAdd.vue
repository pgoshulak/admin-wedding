<template>
  <v-form>
    <v-container text-xs-left>
      <v-layout row wrap>
        <v-flex xs4>
          <v-text-field
            v-model="newName"
            @keyup.enter="submitNew"
            label="Name"
            required
          ></v-text-field>
        </v-flex>
        <v-flex xs4>
          <v-text-field
            v-model="newEmail"
            @keyup.enter="submitNew"
            label="E-mail"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-text-field
            v-model="newPhone"
            @keyup.enter="submitNew"
            mask="phone"
            label="Phone"
          ></v-text-field>
        </v-flex>
        <v-flex xs2>
          <v-btn color="info" @click="submitNew"><v-icon>person_add</v-icon>&nbsp;Add</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </v-form>
</template>

<script>
import { db } from "../../main.js";
export default {
  props: ["familyId"],
  data() {
    return {
      newName: "",
      newEmail: "",
      newPhone: ""
    };
  },
  methods: {
    submitNew() {
      if (this.newName) {
        db
          .collection("guests")
          .add({
            name: this.newName,
            email: this.newEmail,
            phone: this.newPhone,
            familyId: this.familyId
          })
          .then(() => {
            this.newName = "";
            this.newEmail = "";
            this.newPhone = "";
          });
      }
    }
  },
};
</script>

<style scoped>
</style>
