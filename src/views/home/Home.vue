<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <home-swiper :banners="banners" />
    <recommend-view :recommends="recommends" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView.vue'

import { getHomeMultidata } from "network/home";

export default {
  components: {
    NavBar,
    HomeSwiper,
    RecommendView
  },
  data() {
    return {
      result: null,
      banners: [],
      recommends: [],
    };
  },
  // 在组件创建完之后执行这个声明周期函数
  created() {
    // 发送网络请求
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      this.result = res;
      //  console.log(res);
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
};
</script>

<style>
.home-nav {
  color: #fff;
  font-weight: bolder;
  background-color: var(--color-tint);
}
</style>