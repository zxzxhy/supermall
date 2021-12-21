import Vue from 'vue'
import Vuex from 'vuex'

// 安装插件
Vue.use(Vuex)
// 创建 Store 对象
const store = new Vuex.Store({
  state: {
    cartList: []
  },
  // mutations 唯一的目的是修改 state 中的状态
  // mutations  中的方法尽可能的单一一点（就是一个方法尽可能只做一件事情）
  mutations: {
    addCart(state,payload) {
      // const oldProduct = null
      // // 将 state.cartList 遍历,看有没有相同的商品添加,有的话就把它赋值给 oldProduct
      // for(let item of state.cartList){
      //   if(item.iid === payload.iid){
      //     oldProduct = item
      //   }
      // }

      // 查找之前的数组里面是否有该商品 这样子作比较好
      let oldProduct = state.cartList.find(item => {
        return item.iid === payload.iid
      })

      // 判断 oldProduct 是否有值 有就给他加1 没有就push进去
      if(oldProduct){
        oldProduct.count += 1
      }else {
        // 添加 count 并赋值1
        payload.count = 1
        // 将商品 push 进去
        state.cartList.push(payload)
      }


    }
  },
  actions: {
  },
  modules: {
  }
})
// 挂载到Vue实例上
export default store