import Vue from 'vue'
import App from './App'
import router from './router'
import './assets/css/style.css'

Vue.config.productionTip = true
import Mint from 'mint-ui';
Vue.use(Mint);
import 'mint-ui/lib/style.css'
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
