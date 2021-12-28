<template>
  <div class="cart-list">
    <scroll class="content">
      <!-- <li v-for="(item, index) in cartList" :key="index">{{ item }}</li> -->
    </scroll>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import { mapGetters } from "vuex";
export default {
  components: {
    Scroll,
  },
  computed: {
    ...mapGetters(["cartList"]),
  },
};
</script>

<style scoped>
.cart-list {
  width: 100%;
  height: 100%;
}
.content {
  height: calc(100% - 49px - 44px);
}
</style>