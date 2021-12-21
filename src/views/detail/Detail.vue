<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav" />
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="contentScroll"
      :pull-up-load="true"
    >
      <!-- 在标签里面不区分大小写 写topImages 和 topimages 是一样的 所以由驼峰的花最好是以 top-images 这种方式写 -->
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info
        :detail-info="detailInfo"
        @detailImageLoad="detailImageLoad"
      />
      <detail-param-info ref="params" :param-info="paramInfo" />
      <detail-comment-info ref="comment" :comment-info="commentInfo" />
      <detail-recommend-info ref="recommend" />
      <goods-list :goods="recommends" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <detail-bottom-bar @addCart="addToCart" />
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar.vue";

import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll";

import { debounce } from "common/utils";
import { backTopMixin } from "common/mixin";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    currentIndex: 0,
  },
  mixins: [backTopMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null,
    };
  },
  methods: {
    contentScroll(position) {
      // 获取滚动的Y的值
      const positionY = -position.y;

      // positionY和主题中的值进行对比
      for (let i in this.themeTopYs) {
        // 因为拿到的 i 时字符串类型 所以得转换一下
        // i = parseInt(i)
        i = i * 1;
        let length = this.themeTopYs.length;

        // 普通做法
        // if(this.currentIndex !==i && ((i < length-1 && positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]) ||
        // (i === length-1 && positionY >=  this.themeTopYs[i]))){
        //   this.currentIndex = i
        //   this.$refs.nav.currentIndex = this.currentIndex
        // }

        // 高级做法 往 this.themeTopYs 里面多加一个最大值  这种做法会多占一点内存但是性能会好一点（空间 换 性能）
        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }
      }
      // 决定 BackTop 是否显示
      this.listenShowBackTop(position);
    },
    detailImageLoad() {
      this.$refs.scroll.refresh();
      this.getThemeTopY();
    },
    titleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 1000);
    },
    // 添加购物车
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将山商品加入到购物车
      // this.$store.cartList.push(product)
      this.$store.commit("addCart", product);
    },
  },
  created() {
    // 1.$route 当前路由信息对象 保存 我们传入的 iid
    this.iid = this.$route.params.id;
    // 2. 根据iid 请求详情数据
    getDetail(this.iid).then((res) => {
      // 2.1 获取顶部轮播图的图片数据
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages;

      // 2.2获取商品的信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 2.3 获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // console.log(this.shop);

      // 2.4 保存商品信息数据
      this.detailInfo = data.detailInfo;

      //2.5 获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // 2.6 取出商品评论信息  cRate 表示的是评论信息数
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
    });
    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);

      this.themeTopYs.push(Number.MAX_VALUE);
    }, 100);
  },
  mounted() {},
  updated() {
    // $el 指得是vue实例得根得 DOM 元素 在这里获取得的话 会获取多次  图片的高度也没有计算在内
    //  this.themeTopYs = []
    // this.themeTopYs.push(0)
    // this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    // this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs);
  },
};
</script>

<style scoped>
#detail {
  position: relative;
  z-index: 10;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 10;
  background-color: #fff;
}
.content {
  height: calc(100% - 58px);
}
</style>