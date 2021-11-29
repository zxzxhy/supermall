<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
    <feature-view />
    <tab-control :titles="titles" class="tab-control" @tabClick="tabClick" />
    <goods-list :goods="showGoods" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl.vue";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView.vue";
import FeatureView from "./childComps/FeatureView.vue";
import GoodsList from "components/content/goods/GoodsList.vue";

import { getHomeMultidata, getHomeGoods } from "network/home";

export default {
  components: {
    NavBar,
    TabControl,
    HomeSwiper,
    GoodsList,
    RecommendView,
    FeatureView,
  },
  data() {
    return {
      // result: null,
      banners: [],
      recommends: [],
      titles: ["流行", "新款", "精选"],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType:'pop'
    };
  },
  // 在组件创建完之后执行这个声明周期函数
  created() {
    // 发送网络请求
    // 1.请求多个数据
    this.getHomeMultidata();

    // 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  computed:{
    // 展示那个类型的商品
    showGoods () {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /* 
      事件监听相关方法
    */
    tabClick (index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
          case 1:
          this.currentType = 'new'
          break
          case 2:
          this.currentType = 'sell'
          break
      }
    },
    /* 
      网络请求相关方法
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        // this.result = res;
        //  console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {

        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
      });
    }

  },
};
</script>

<style>
#home {
  padding-top: 44px;
}
.home-nav {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 1000;
  color: #fff;
  font-weight: bolder;
  background-color: var(--color-tint);
}
.tab-control {
  position: sticky;
  top: 44px;
  z-index: 999;
}
</style>