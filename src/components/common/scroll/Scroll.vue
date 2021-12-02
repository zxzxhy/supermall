<template>
  <!-- ref / children 可以准确获取元素 
        - 如果是绑定在组件中的可以通过  this.$refs.refname 获取到组件对象
        - 如果是绑定在普通的元素中   this.$refs.refname 获取到的就是元素对象    
   -->
  <div class="warpper" ref="warpper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 创建 better-scroll
    this.scroll = new BScroll(this.$refs.warpper, {
      click: true,
      // 设置允许上拉加载监听
      pullUpLoad: this.pullUpLoad,
      // 开启插件 如果没有需要 NPM 一下  加上这个才可以滚动
      // 开启对 content 以及 content 子元素 DOM 改变的探测，这些 DOM 元素发生变化时，将会触发 scroll 的 refresh 方法参考better-scroll官网 
      observeDOM: true,
      // 写了这个才能监听滚动
      probeType: this.probeType,
      // 开启对 wrapper 子元素中图片元素的加载的探测。无论图片的加载成功与否，都会自动调用 BetterScroll 的 refresh 方法来重新计算可滚动的宽度或者高度 都可以去官方网站查看  开启插件 如果没有需要 NPM 一  不加的话下拉之后需要等一会才能往下拉
      observeImage:true,
      // 如果向鼠标滚轮在这个插件里面能用就得添加这个
      mouseWheel:true
    });
    // 监听滚动位置
    this.scroll.on("scroll", (position) => {
      // 通过父子通信自定义事件将 postion 传出去
      this.$emit("scroll", position);
    });
    // 监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 1000) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll.finishPullUp();
    },
    refresh () {
     this.scroll && this.scroll.refresh()
    }
  },
};
</script>

<style>
</style>