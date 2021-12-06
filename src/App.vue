<template>
  <div id="app">
    <!-- exclude="Detail" 将 Detail 排除在外，不保存原来的状态 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
  </div>
</template>
<script>
import MainTabBar from "components/content/mainTabBar/MainTabBar";

export default {
  components: {
    MainTabBar,
  },
};
</script>


<style>
@import "./assets/css/base.css";
</style>
