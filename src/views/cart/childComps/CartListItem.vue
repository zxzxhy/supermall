<template>
  <!-- 得再包一层才能滚动 -->
  <div id="shop-item">
    <div class="item-selector">
      <check-button :is-checked='product.checked' @click.native='checkClick'></check-button>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片" />
    </div>
    <div class="item-info">
      <div class="item-title">
        {{ product.title }}
      </div>
      <div class="item-desc">商品描述:{{ product.desc }}</div>
      <div class="item-bottom">
        <div class="item-price left">¥{{ product.price }}</div>
        <div class="item-count right">x{{ product.count }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton.vue";
export default {
  components: {
    CheckButton,
  },
  props: {
    product: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods:{
    checkClick() {
      this.product.checked = !this.product.checked
    }
  }
};
</script>

<style>
#shop-item {
  display: flex;
  width: 100%;
  padding: 5px;
  border-bottom: 1px solid #ccc;
}
.item-selector {
  display: flex;
  /* 水平剧中排列 */
  /* justify-content: center; */
  /* 垂直居中排列 */
  align-items: center;
}
.item-img {
  padding: 5px;
}
.item-img img {
  width: 80px;
  height: 100px;
  border-radius: 5px;
  display: block;
}
.item-info {
  font-size: 17px;
  color: #333;
  padding: 5px 10px;
  position: relative;
  /* 得加上这个，要不然显示不了文字后面的 。。。 */
  overflow: hidden;
}
.item-title,
.item-desc {
  overflow: hidden;
  /* 不换行 */
  white-space: nowrap;
  /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
  text-overflow: ellipsis;
}
.item-desc {
  font-size: 14px;
  color: #666;
  margin-top: 15px;
}
.item-bottom {
  margin-top: 10px;
  position: absolute;
  bottom: 10px;
  left: 10px;
  right: 10px;
}
.item-price {
  font-size: 17px;
  font-weight: 500;
  float: left;
  color: orangered;
}
.item-count {
  float: right;
}
</style>