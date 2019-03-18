import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from './config'
import firebase from 'firebase'

Vue.config.productionTip = false

firebase.initializeApp(config)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
