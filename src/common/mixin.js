import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false
    }
  },
  methods: {
    // 回到顶部组件的点击
    backClick() {
      // this.$refs.scroll 拿到的是 scroll 组件对象 第三个参数是用多少时间回到顶部  scrollTo 这个是 better-scroll 的方法
      // this.$refs.scroll.scroll.scrollTo(0,0,1000)

      // 因为 scrollTo方法已经在 BackScroll封装好了 所以可以直接调用
      this.$refs.scroll.scrollTo(0, 0, 1000);
    },
    listenShowBackTop(position){
      this.isShowBackTop = -position.y > 1000;
    }
  }
}