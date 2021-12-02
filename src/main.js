import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
createApp(App).use(store).use(router).mount('#app')

// 事件主线的方法实现  vue2
// Vue.prototype.$bus = new Vue()
// vue3
// App.config.globalProperties.$bus = bus