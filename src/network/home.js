import { request } from "./request";
export function getHomeMultidata() {
  return request({
    url:'/home/multidata'
  })

}
// 发送网络请求，获取首页相关的商品数据
export function getHomeGoods(type,page) {
  return request({
    url:'/home/data',
    params:{
      type,
      page
    }
  })
}