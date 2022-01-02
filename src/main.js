import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import VueLazyload from 'vue-lazyload'
import Fastclick from 'fastclick'


import toast from 'components/common/toast/index'

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()

// 使用懒加载插件
// Vue.use(VueLazyload)

// 安装 toast 插件   https://github.com/hilongjw/vue-lazyload
Vue.use(toast)


// 解决移动端的300毫秒延迟 attach:附加
Fastclick.attach(document.body)


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
