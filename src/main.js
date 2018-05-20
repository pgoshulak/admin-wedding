import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { firebaseConfig } from '../secrets.js'

Vue.use(VueFire)
Vue.use(Vuetify)

// https://medium.com/vue-mastery/full-stack-vue-js-with-firestore-62e2fe2ec1f3
const firebaseApp = firebase.initializeApp(firebaseConfig)
export const db = firebaseApp.firestore()
db.settings({
  timestampsInSnapshots: true
})

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
