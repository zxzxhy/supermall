<template>
  <div class="goods">
    <goods-list-item
      v-for="item in goods"
      :key="item.index"
      :goods-item="item"
    />
  </div>
</template>

<script>
import GoodsListItem from "./GoodsListItem.vue";
export default {
  components: {
    GoodsListItem,
  },
  props: {
    goods: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.goods {
  position: relative;
  padding: 2px;
  display: flex;
  padding-bottom: 40px;
  flex-wrap: wrap;
  justify-content: space-around;
}
.goods img {
  width: 100%;
}
</style>