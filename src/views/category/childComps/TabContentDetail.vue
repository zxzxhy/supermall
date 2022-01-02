<template>
  <div>
    <goods-list :goods="categoryDetail" ></goods-list>
  </div>
</template>

<script>
import GoodsList from 'components/content/goods/GoodsList.vue'
export default {
  props:{
    categoryDetail:{
      type:Array,
      default () {
        return []
      }
    },
  },
  components: { GoodsList },
  
}
</script>

<style>

</style>