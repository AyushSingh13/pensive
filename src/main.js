import Vue from 'vue'
import App from './App.vue'

// Firebase
import VueFire from 'vuefire'
import './firebase'

Vue.config.productionTip = false

Vue.use(VueFire);

new Vue({
  render: h => h(App)
}).$mount('#app')
