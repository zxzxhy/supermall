<template>
  <div>
    <div class="recommend-header">热门推荐</div>
  </div>
</template>

<script>
export default {
  props: {
    recommend: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recommend-header {
  padding-left: 8px;
  height: 40px;
  line-height: 40px;
  font-size: 15px;
  color: #333;
}
</style>