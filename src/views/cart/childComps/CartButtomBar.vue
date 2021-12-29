<template>
  <div class="buttom-bar">
    <div class="check-content">
      <check-button
        class="check-all"
        :is-checked="isSelectAll"
        @click.native="checkClick"
      />
      <span>全选</span>
    </div>
    <div class="totalPrice">合计：{{ totalPrice }}</div>
    <div class="calculate">结算({{ checkLength }})</div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
import { mapGetters } from "vuex";
export default {
  components: { CheckButton },
  computed: {
    // 加入了这个之后就不用 写完整的this.$store.getters.cartList  直接写 this.cartList 就可以了
    // 将 cartList 混入到 计算属性中
    ...mapGetters(["cartList"]),
    totalPrice() {
      // 取出选中的数据  checked = ture 的数据
      return (
        "¥" +
        this.cartList
          .filter((item) => {
            // filter 一个新的、由通过测试的元素组成的数组
            return item.checked;
          })
          .reduce((preValue, item) => {
            // 将其结果汇总为单个返回值  preValue 前一个值   0 是初始化值
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      ); // toFixed(2) 保留两位小数
    },
    checkLength() {
      return this.cartList.filter((item) => item.checked).length;
    },
    isSelectAll() {
      // 在没有数据的情况下 让他返回false 要不然他就会返回 undefind(false) 取反就成true  所以再加一个判断
      if (this.cartList.length == 0) {
        return false;
      }
      // return !(this.$store.getters.cartList.filter(item =>!item.checked).length)
      // 这个性能个好一点
      return !this.cartList.find((item) => !item.checked);
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {
        // 全部选中的状态下
        this.cartList.forEach((item) => (item.checked = false));
      } else {
        // 有部分或者全部不选中
        this.cartList.forEach((item) => (item.checked = true));
      }
    },
  },
};
</script>

<style scoped>
.buttom-bar {
  display: flex;
  padding: 0 5px;
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 49px;
  left: 0;
  background-color: #eee;
}
.check-content,
.totalPrice {
  display: flex;
  align-items: center;
}
.check-content > span {
  margin-left: 5px;
  font-size: 14px;
  width: 40px;
}
.check-all {
  margin-left: 5px;
  width: 20px;
  height: 20px;
}
.totalPrice {
  flex: 1;
  margin-left: 15px;
}
.calculate {
  background-color: orangered;
  color: #fff;
  width: 100px;
  height: 40px;
  text-align: center;
  line-height: 44px;
  /* border-radius: 30px; */
}
</style>