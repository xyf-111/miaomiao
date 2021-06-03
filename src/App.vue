<template>
  <div id="app">
    <!-- 为了避免每次切换路由时重新渲染页面影响效果，加上<keep-alive>后让路由先缓存-->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
</style>
