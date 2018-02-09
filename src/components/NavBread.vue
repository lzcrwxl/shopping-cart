<template>
  <div class="nav-breadcrumb-wrap">
    <div class="container">
      <div class="nav-breadcrumb">
        <a href="/">Home</a>
        <slot name="bread"></slot>
      </div>
    </div>
  </div>
</template>
<style lang="less" rel="stylesheet/less" scoped>
</style>
<script>
  export default{
    data(){
      return {}
    },
  }
</script>
