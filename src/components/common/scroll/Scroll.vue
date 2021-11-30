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
import BScroll from 'better-scroll'
export default {
  data () {
    return {
      scroll:null
    }
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.warpper,{
      click: true,
      pullUpLoad:true,
      // 得加上这个 要不然刷新之后无法滚动
      observeDOM:true
    })
    this.scroll.on('pullingUp',()=>{
      // console.log('上拉加载更多');
      this.scroll.finishPullUp()
    })
  },
  methods:{
    scrollTo(x,y,time=1000) {
      this.scroll.scrollTo(x,y,time)
    }
  }
};
</script>

<style>
</style>