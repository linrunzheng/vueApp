import Vue from 'vue'
import App from './App'
import router from './router'
import base from './base/base.js'

import VueTouch from 'vue-touch'
Vue.use(VueTouch, {name: 'v-touch'})

import axios from 'axios'
Vue.use(axios)
Vue.prototype.$ajax=axios;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
