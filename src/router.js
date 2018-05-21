import Vue from 'vue'
import Router from 'vue-router'

import Families from './components/Families'

Vue.use(Router)

export default new Router ({
  routes: [
    {
      path: '/',
      name: 'Families',
      component: Families
    }
  ]
})