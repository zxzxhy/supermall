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
    this.realPrice = itemInfo.lowNowPrice;
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

export class GoodsParam {
  constructor (info,rule) {
    // 有些是由图片的，有些是没有图片的
    this.image = info.images ? info.images[0] : '';
    this.infos = info.set;
    this.sizes = rule.tables
  }
}
export function getRecommend() {
  return request({
    url:"/recommend"
  })
}