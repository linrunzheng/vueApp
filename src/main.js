import Vue from 'vue'
import App from './App'
import router from './router'
import './base/js/base.js'
import { store } from './store/index.js'
import 'swiper/dist/css/swiper.css'

/*滑动事件*/
import VueTouch from 'vue-touch'
Vue.use(VueTouch, { name: 'v-touch' })

/*ajax请求*/
import axios from 'axios'
axios.defaults.baseURL = 'https://api.douban.com/v2/movie'
Vue.prototype.$ajax = axios

/*图片懒加载*/
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  loading: require('@/assets/head.jpg'),
  attempt: 1
})

/* 轮播图 */
import VueAwesomeSwiper from 'vue-awesome-swiper'
Vue.use(VueAwesomeSwiper)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
