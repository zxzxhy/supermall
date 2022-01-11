<template>
  <div class="category">
    <nav-bar class="category-navbar">
      <template #center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <div class="content">
        <tab-menu :categories="categories" @selectItem="selectItem" />
      <div class="tab-width">
        <tab-control
          :titles="Categotytitles"
          @tabClick="tabClick"
          ref="tabControl1"
          v-show="isTabFixed"
        />
        <scroll
          class="tab-content"
          ref="scroll"
          :probe-type="3"
          :pull-up-load="true"
          @scroll="contentScroll"
        >
          <div>
            <tab-content-category
              :subcategories="showSubcategory"
              @CategoryImageLoad="CategoryImageLoad"
              ref="scroll"
            />
            <tab-control
              :titles="Categotytitles"
              @tabClick="tabClick"
              ref="tabControl2"
            />
            <tab-content-detail :category-detail="showCategoryDetail" />
          </div>
        </scroll>
      </div>
      <back-top @click.native="backClick" v-show="isShowBackTop" />
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import TabControl from "components/content/tabControl/TabControl.vue";
import BackTop from "../../components/content/backTop/BackTop.vue"

import TabMenu from "./childComps/TabMenu.vue";
import TabContentCategory from "./childComps/TabContentCategory.vue";

import { tabControlMixin,backTopMixin } from "../../common/mixin";
import { debounce } from "../../common/utils";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail,
} from "network/category";
import TabContentDetail from "./childComps/TabContentDetail.vue";

export default {
  components: {
    NavBar,
    TabMenu,
    TabContentCategory,
    Scroll,
    TabControl,
    TabContentDetail,
    BackTop
  },
  mixins: [tabControlMixin,backTopMixin],
  data() {
    return {
      currentIndex: -1,
      categories: [],
      categoryData: {},
      Categotytitles: ["综合", "新品", "销量"],
      itemImgListener: null,
      saveY: 0,
      isTabFixed: false,
      tabOffsetTop: 0,
    };
  },
  created() {
    // 请求分类数据
    this.getCategoryList();
  },
  watch: {
    categoryData: function () {
       this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
  },
  mounted() {
    // 使用防抖动函数 图片加载完成得事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    this.itemImgListener = () => {
      refresh();
    };
    this.$bus.$on("itemImageLoad", this.itemImgListener);
  },
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 1);
    this.$refs.scroll.refresh();
  },
  deactivated() {
    // 保存 Y 的值
    this.saveY = this.$refs.scroll.getScrollY();
    // 取消全局事件监听  这里指取消 this.itemImgListener 这个函数的 itemImgload 监听
    this.$bus.$off("itemImgload", this.itemImgListener);
  },
  computed: {
    showSubcategory() {
      if (this.currentIndex === -1) return {};
      return this.categoryData[this.currentIndex].subcategories;
    },
    showCategoryDetail() {
      if (this.currentIndex === -1) return [];
      return this.categoryData[this.currentIndex].categoryDetail[this.currentType];
    },
  },
  methods: {
    getCategoryList() {
      getCategory().then((res) => {
        // 1.获取分类数据
        this.categories = res.data.category.list;
        // 2.初始化每个分类的类别
        for (let i = 0; i < this.categories.length; i++) {
          this.categoryData[i] = {
            // 用来存储 TabContentCategory 的需要的数据
            subcategories: {},
            // 用来储存 TabContentDetail 需要的数据
            categoryDetail: {
              pop: [],
              new: [],
              sell: [],
            },
          };
        }
        // 发送网络请求，获取第一个分类的数据
        this.getSubcategoryInfo(0);
      });
    },
    getSubcategoryInfo(index) {
      this.currentIndex = index;
      const mailKey = this.categories[index].maitKey;
      getSubcategory(mailKey).then((res) => {
        this.categoryData[index].subcategories = res.data;
        this.categoryData = { ...this.categoryData };
        this.getCategoryDetailInfo("new");
        this.getCategoryDetailInfo("pop");
        this.getCategoryDetailInfo("sell");
      });
    },
    getCategoryDetailInfo(type) {
      // 1.获取请求的miniWallkey
      const miniWallkey = this.categories[this.currentIndex].miniWallkey;
      // 2.发送请求,传入miniWallkey和type
      getCategoryDetail(miniWallkey, type).then((res) => {
        // 3.将获取的数据保存下来
        this.categoryData[this.currentIndex].categoryDetail[type] = res;
        this.categoryData = { ...this.categoryData };
      });
    },
    // 监听分类页面图片加载
    CategoryImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    contentScroll(position) {
       // 决定 BackTop 是否显示
      this.listenShowBackTop(position)
      // 决定 tab-control 是否显示
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 监听 tab-menu 点击
    selectItem(index) {
      this.$refs.scroll.scrollTo(0, 0, 1);
      this.getSubcategoryInfo(index);
    },
  },
};
</script>

<style scoped>
.category {
  height: 100vh;
}
.category-navbar {
  position: relative;
  left: 0;
  top: 0;
  color: #fff;
  font-weight: bolder;
  background-color: var(--color-tint);
  z-index: 10;
}
.content {
  display: flex;
}
.tab-content {
  position: absolute;
  top: 44px;
  left: 100px;
  height: calc(100vh - 49px);
  flex: 1;
  width: calc(100% - 100px);
}
.tab-width {
  width: 100%;
}
</style>