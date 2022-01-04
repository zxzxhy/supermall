<template>
  <tab-bar>
    <!-- 如果向设置字体颜色 在 tab-bar-item中加入  activeColor="pink" -->
    <tab-bar-item path="/home">
      <!-- v-slot:  的简写是 # -->
      <template #item-icon>
        <img src="~assets/img/tabbar/home.svg" alt="" />
      </template>
      <template v-slot:item-text> <div>首页</div> </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/home_active.svg" alt="" />
      </template>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <template #item-icon>
        <img src="~assets/img/tabbar/category.svg" alt="" />
      </template>
      <template #item-text> <div>分类</div> </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/category_active.svg" alt="" />
      </template>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <template #item-icon>
        <img src="~assets/img/tabbar/cart.svg" alt="" />
      </template>
      <template #item-text> <div>购物车</div> </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/cart_active.svg" alt="" />
      </template>
    </tab-bar-item>
    <tab-bar-item path="/profile">
      <template #item-icon>
        <img src="~assets/img/tabbar/profile.svg" alt="" />
      </template>
      <template #item-text> <div>我的</div> </template>
      <template #item-icon-active>
        <img src="~assets/img/tabbar/profile_active.svg" alt="" />
      </template>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "components/common/tabbar/TabBar";
import TabBarItem from "components/common/tabbar/TabBarItem";

export default {
  components: { TabBar, TabBarItem },
};
</script>

<style>
</style>