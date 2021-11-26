<template>
  <div class="recammend">
    <div v-for="item in recommends" :key="item.index" class="recammend-item">
      <a :href="item.link">
        <img :src="item.image" alt="" />
      </a>
      <div>{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recommends: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>

<style>
.recammend {
  display: flex;
  margin-top: 10px;
  padding-bottom: 20px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  border-bottom: 10px solid #eee ;
}
.recammend-item {
  flex: 1;
}
.recammend-item img {
  margin-bottom: 10px;
  width: 80px;
  height: 80px;
}
</style>