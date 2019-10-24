import Vue from 'vue'
import './plugins/axios'
import App from '@/App.vue'
import '@/registerServiceWorker'
import router from '@/router'
import store from '@/store'
import '@/plugins'
import '@/components'
import vuetify from './plugins/vuetify'
import '@babel/polyfill'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
