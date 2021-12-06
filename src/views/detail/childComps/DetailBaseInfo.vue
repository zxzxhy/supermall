<template>
  <div class="base-info"  v-if="Object.keys(goods).length !== 0">
    <div class="info-title">{{ goods.title }}</div>
    <div class="info-price">
      <span class="n-price">{{ goods.newPrice }}</span>
      <span class="o-price">{{ goods.oldPrice }}</span>
      <span class="discount">{{ goods.discount }}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-servies">
      <span v-for='(item,index) in goods.services.length-1' :key='index'>
        <img :src="goods.services[index].icon" alt="">
        <span>{{goods.services[index].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    goods: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style scoped>
.base-info {
  margin: 0 5px 0;
  border-bottom: 5px solid #f2f5f8;
}
.info-title {
  margin: 10px 0 10px;
}
.n-price {
  font-size: 24px;
  color: var(--color-high-text);
}
.o-price {
  font-size: 13px;
  color: #999;
  text-decoration: line-through;
}
.discount {
  position: relative;
  top: -8px;
  margin-left: 5px;
  padding: 2px 5px;
  font-size: 13px;
  background-color: var(--color-high-text);
  color: #fff;
  border-radius: 8px;
}
 .info-other {
  display: flex;
  margin-top: 15px;
  line-height: 30px;
  font-size: 12px;
  justify-content: space-between;
  border-bottom: 1px solid rgba(100, 100, 100, .1);
}
.info-other span {
  color: #999;
}
.info-servies {
  display: flex;
  justify-content: space-between;
  line-height: 60px;
  font-size: 13px;
}
.info-servies img {
  width: 14px;
}
</style>