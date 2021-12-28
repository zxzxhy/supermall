import {ADD_COUNTER,ADD_TO_CART} from './mutations-types'
export default {
  addCart(context,payload) {
    // const oldProduct = null
    // // 将 state.cartList 遍历,看有没有相同的商品添加,有的话就把它赋值给 oldProduct
    // for(let item of state.cartList){
    //   if(item.iid === payload.iid){
    //     oldProduct = item
    //   }
    // }

    // 查找之前的数组里面是否有该商品 这样子作比较好
    let oldProduct = context.state.cartList.find(item => {
      return item.iid === payload.iid
    })

    // 判断 oldProduct 是否有值 有就给他加1 没有就push进去
    if(oldProduct){
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
    }else {
      // 添加 count 并赋值1
      payload.count = 1
      // 将商品 push 进去
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_CART,payload)
    }


  }
}