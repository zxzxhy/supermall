<template>
  <div class="toast" v-show="isShow">{{ message }}</div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      message: "",
    };
  },
  methods: {
    // es6 添加默认参数
    show(message='商品成功添加', duration=2000) {
      // 给 duration 添加默认参数
      // duration = duration || 2000

      this.isShow = true;
      this.message = message;
      setTimeout(() => {
        this.isShow = false;
        this.message = "";
      }, duration);
    },
  },
};
</script>

<style scoped>
.toast {
  position: absolute;
  width: 150px;
  height: 40px;
  padding: 8px 10px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: #fff;
  background-color: rgba(0, 0, 0, 0.7);
  text-align: center;
  border-radius: 8px;
  line-height: 24px;
  z-index: 99;
}
</style>