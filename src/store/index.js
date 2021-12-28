import Vue from 'vue'
import Vuex from 'vuex'

import mutations from '../store/mutations'
import actions from '../store/actions'
import getters from './getters'
// 安装插件
Vue.use(Vuex)

// 创建 Store 对象
const state = {
  cartList: []
}
const store = new Vuex.Store({
  state,
  // mutations 唯一的目的是修改 state 中的状态
  // mutations  中的方法尽可能的单一一点（就是一个方法尽可能只做一件事情）
  mutations,
  actions,
  modules: {
  },
  getters
})
// 挂载到Vue实例上
export default store