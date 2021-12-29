<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <template #center>
        <div>购物车({{ cartLength }})</div>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-buttom-bar></cart-buttom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
import CartList from './childComps/CartList.vue'
import CartButtomBar from './childComps/CartButtomBar.vue';

import { mapGetters } from 'vuex'

export default {
  components: {
    NavBar,
    CartList,
    CartButtomBar
  },
  computed:{
     // 使用对象展开运算符将 getter 混入 computed 对象中 就是将里面的内容转化成计算属性
    ...mapGetters(['cartLength'])
  }
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  color: #fff;
  font-weight: bolder;
  background-color: var(--color-tint);
}
</style>