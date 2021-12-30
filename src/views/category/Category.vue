<template>
  <div class="category">
    <nav-bar class="category-navbar">
      <template #center>
        <div>商品分类</div>
      </template>
    </nav-bar>
    <div class="content">
      <tab-menu :categories="categories" />
    </div>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import TabMenu from "./childComps/TabMenu.vue";

import { getCategory, getSubcategory } from "network/category";

export default {
  components: {
    NavBar,
    TabMenu,
  },
  data() {
    return {
      categories: [],
      categoryData:{},
      currentIndex: -1,
    };
  },
  created() {
    // 请求分类数据
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
      getCategory().then((res) => {
        this.categories = res.data.category.list;
      });
    },
    getSubcategoryInfo(index) {
      this.currentIndex = index
      const mailKey = this.categories[index].mailKey
      getSubcategory(mailKey).then(res =>{
        this.categoryData[index] = res.data
         this.categoryData = [... this.categoryData]
      })
    },
  },
};
</script>

<style>
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
</style>