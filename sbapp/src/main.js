import Vue from 'vue'
import App from './App.vue'

import 'semantic-ui-css/semantic.css'
import router from './router'
import VueFlashMessage from 'vue-flash-message';

Vue.use(VueFlashMessage);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
