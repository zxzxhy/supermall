import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
export default  {
  [ADD_COUNTER](state,payload) {
    payload.count++
  },
  [ADD_TO_CART](state,payload) {
    // 在商品里面添加 checked 属性 来设置购物车中的商品是否选中
    payload.checked = true
    // 将商品添加到 cartList 里面
    state.cartList.push(payload)
  }
}