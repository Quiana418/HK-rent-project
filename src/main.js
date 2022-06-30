import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'amfe-flexible'
import Vant, { Lazyload } from 'vant'
// import 'vant/lib/index.css'
import '@/assets/fonts/font_3480211_e0c9393e9fh/iconfont.css'

// 引入全部样式
import 'vant/lib/index.less'

// Vue.use(Lazyload)

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true
})

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
