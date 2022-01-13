<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll" >
      <cart-list-item v-for="(item,index) in cartList" :key="index" :product='item'></cart-list-item>
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import CartListItem from "../childComps/CartListItem.vue"
import { mapGetters } from "vuex";
export default {
  components: {
    Scroll,
    CartListItem
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
  // activated：在组件被激活时调用，在组件第一次渲染时也会被调用，之后每次keep-alive激活时被调用
  activated() {
    // 因为在开始时，购物车是没有东西的高度为0，所以导致滚动不了，需要在组件被激活时刷新一下，让scroll刷新到内容的最新高度
    this.$refs.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list {
  width: 100%;
  height: 100%;
}
.content {
  height: calc(100% - 49px - 44px - 40px);
  overflow: hidden;
}
</style>