<template>
  <div class="detailInfo" v-if="Object.keys(detailInfo).length !== 0">
    <div class="info-desc clear-fix" >
      <div class="start"></div>
      <div class="desc">
        {{ detailInfo.desc }}
      </div>
      <div class="end"></div>
    </div>
    <div>{{ detailInfo.detailImage[0].key }}</div>
    <div class="info-list">
      <img v-for="(item,index) in detailInfo.detailImage[0].list"  :key="index" :src="item" alt="">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>

<style>
.detailInfo {
  padding: 20px;
  border-bottom: 5px solid #f2f5f8;
}
.start {
  position: relative;
  float: left;
  width: 90px;
  height: 1px;
  background-color: #ccc;
}
.end {
  position: relative;
  float: right;
  width: 90px;
  height: 1px;
  background-color: #ccc;
}
.info-desc {
  font-size: 14px;
  padding: 0 15px;
}
.desc {
  padding: 14px 0;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  background-color: #333;
  bottom: 0;
}
.info-desc .end::after {
  right: 0;
}
.info-list img {
  width: 100%;
}
</style>