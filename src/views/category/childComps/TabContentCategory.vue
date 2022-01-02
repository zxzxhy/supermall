<template>
  <div class="content-category">
    <div v-for="(item, index) in subcategories.list" :key="index" class="item">
      <a :href="item.link">
        <img
          :src="item.image"
          alt=""
          class="item-img"
          @load="CategoryimageLoad"
        />
        <div class="item-text">{{ item.title }}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      isLoad:false
    }
  },
  props: {
    subcategories: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 监听  CategoryimageLoad 是否加载完成
    CategoryimageLoad() {
      if (!this.isLoad) {
        this.$emit("CategoryImageLoad");
        this.isLoad = true;
      }
    },
  },
};
</script>

<style scoped>
.content-category {
  display: flex;
  padding: 5px 8px;
  flex-flow: wrap;
  justify-content: space-between;
}
.item {
  width: 81px;
  text-align: center;
  font-size: 12px;
  margin-top: 15px;
}
.item-img {
  width: 64px;
  height: 64px;
}
.item-text {
  margin-top: 5px;
}
</style>