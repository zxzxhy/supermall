<template>
  <div id="home">
    <nav-bar class="home-nav">
      <template #center>
        <div>购物街</div>
      </template>
    </nav-bar>
    <tab-control
      :titles="titles"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    />
    <!-- 
      ref / children 可以准确获取元素 
        - 如果是绑定在组件中的可以通过  this.$refs.refname 获取到组件对象
        - 如果是绑定在普通的元素中   this.$refs.refname 获取到的就是元素对象 
        - 所有的组件都有一个 $el 这个元素是用于获取组件中的元素的 
     -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="titles" @tabClick="tabClick" ref="tabControl2" />
      <goods-list :goods="showGoods" />
    </scroll>
    <!-- 像监听组件的话必许加上 native 他是监听组件根元素的原生事件 vue3不加也行 -->
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import Scroll from "components/common/scroll/Scroll";

import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import GoodsList from "components/content/goods/GoodsList";


import { getHomeMultidata, getHomeGoods } from "network/home";
import {debounce} from "common/utils"
import { backTopMixin } from "common/mixin"

export default {
  components: {
    NavBar,
    TabControl,
    Scroll,
    HomeSwiper,
    GoodsList,
    RecommendView,
    FeatureView,
  },
  mixins:[backTopMixin],
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
      currentType: "pop",
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      itemImgListener:null
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
  mounted() {
    // 使用防抖动函数 图片加载完成得事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () => {
      // this.$refs.scroll.refresh()
      refresh();
    }
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  computed: {
    // 展示那个类型的商品
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },

  /* 为了能保存 跳转前页面的状态 使用了 activated  deactivated 配合 keep-alive  但是现在better-scroll */
  // 处于活跃状态
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 1);
    this.$refs.scroll.refresh();
  },
  // 不处于活跃状态
  deactivated() {
    // 保存y值
    this.saveY = this.$refs.scroll.getScrollY();

    // 取消全局事件监听  这里指取消 this.itemImgListener 这个函数的 itemImgload 监听
    this.$bus.$off('itemImgload',this.itemImgListener)
  },
  methods: {
    /* 
      事件监听相关方法
    */
    tabClick(index) {
      // console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      // 让两个 tabControl 的状态保持一致
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
      this.$refs.scroll.scrollTo(0,-this.$refs.tabControl2.$el.offsetTop,1)
    },
    contentScroll(position) {
      // 决定 BackTop 是否显示
      this.listenShowBackTop(position)
      // 决定 tabControl 是否吸顶
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      // console.log('上拉加载更多');
      this.getHomeGoods(this.currentType);
      // 除了在 Scroll 组件 scroll里面添加 observeImage:true 之外可以在这例设置 当图片加载完之后刷新一下就可以正常滑动了
      // this.$refs.scroll.refresh()
    },
    swiperImageLoad() {
      // 获取 tabControl 的 offsetTop
      // this.$refs.tabControl 这个拿到的是一个组件，我们需要的是组件里面的元素
      // 所有的组件都有一个 $el 这个元素是用于获取组件中的元素的
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
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
        this.$refs.scroll.finishPullUp();
      });
    },
  },
};
</script>

<style scoped>
#home {
  position: relative;
  height: 100vh;
}
.home-nav {
  /* 在使用浏览器原生滚动时，为了让导航不跟随一起滚动 而使用的 */
  /* position: fixed;
  left: 0;
  top: 0;
  right: 0; */
  z-index: 1000;
  color: #fff;
  font-weight: bolder;
  background-color: var(--color-tint);
}
.content {
  position: absolute;
  top: 44px;
  bottom: 10px;
  left: 0;
  right: 0;
  overflow: hidden;
}

/* .content {
  height: calc(100% - 49px);
  margin-top: 44px;
  overflow: hidden;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
</style>