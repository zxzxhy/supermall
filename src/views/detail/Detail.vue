<template>
  <div id="detail">
    <detail-nav-bar />
    <detail-swiper :topImages="topImages" />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar.vue'
import DetailSwiper from './childComps/DetailSwiper.vue'

import { getDetail } from 'network/detail'

export default {
  name:'Detail',
  components:{
    DetailNavBar,
    DetailSwiper
  },
  data() {
    return {
      iid:null,
      topImages:[]
    }
  },
  created() {
    // 1.$route 当前路由信息对象 保存 我们传入的 iid
    this.iid = this.$route.params.id
    // 2. 根据iid 请求详情数据
    getDetail (this.iid).then(res=>{
      // 2.1 获取顶部轮播图的图片数据
      console.log(res);
      this.topImages = res.result.itemInfo.topImages
    })
  }
}
</script>

<style>
</style>