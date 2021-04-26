import Vue from 'vue'
import App from '@/views/Login.vue'
import router from '@/router/router'
import store from '@/store/store'
import '@/plugins/element.js'
import '@/styles/icons/iconfont.css'
import '@/styles/common.scss'
import '@/styles/normalize.css'
import '@/permission'
import '@/utils/directives'
import {loadding,updatePublic} from '@/utils/dialogUtils'
Vue.config.productionTip = false


Vue.mixin(loadding)
Vue.mixin(updatePublic)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
