<template>
  <div>
    <h2>{{ this.$route.params.id }}</h2>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iid:null
    }
  },
  created() {
    // $route 当前路由信息对象
    this.iid = this.$route.params.id
  }
}
</script>

<style>

</style>