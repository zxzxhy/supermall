import { request } from './request'

export function getDetail(iid) {
  return request({
    url:'/detail',
    params:{
      iid
    }
  })
}

export class Goods {
  constructor (itemInfo, columns, services) {
    this.title = itemInfo.title
    this.newPrice = itemInfo.price
    this.oldPrice = itemInfo.oldPrice
    this.desc = itemInfo.desc
    this.discount = itemInfo.discountDesc
    this.nowPrice = itemInfo.highNowPrice;
    this.columns = columns;
    this.services = services;
  }
}

export class Shop {
  constructor (shopInfo) {
    this.logo = shopInfo.shopLogo
    this.name = shopInfo.name
    this.fans = shopInfo.cFans
    this.score = shopInfo.score
    this.sells = shopInfo.cSells
    this.goodsCount = shopInfo.cGoods
  }
}
