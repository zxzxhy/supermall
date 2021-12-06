<template>
  <nav-bar>
    <template #left>
      <div class="back" @click="backClick">
        <img src="~assets/img/common/back.svg" alt="" />
      </div>
    </template>
    <template #center>
      <div class="title">
        <div
          v-for="(item, index) in title"
          :key="index"
          class="title-item"
          :class="{ active: index == currentIndex }"
          @click="titleClick(index)"
        >
          {{ item }}
        </div>
      </div>
    </template>
  </nav-bar>
</template>

<script>
import NavBar from "components/common/navbar/NavBar.vue";
export default {
  components: {
    NavBar,
  },
  data() {
    return {
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backClick() {
      // this.$router.go(-1)
      this.$router.back()
    }
  },
};
</script>

<style>
.title {
  display: flex;
}
.title-item {
  flex: 1;
  font-size: 14px;
  font-weight: 600;
}
.active {
  color: var(--color-high-text);
}
.back {
  text-align: center;
  margin-top: 5px;
}
</style>