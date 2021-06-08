<template>
  <div id='header'>
    <div class='header'>
      <h2>{{title}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  // 添加了name以后，便于vue调试
  name: 'Header',
  props: {
    title: {
      type: String,
      default: '喵喵电影'
    }
  }
}
</script>

<style lang="scss" scoped>
#header {
  position: relative;
  width: 100%;
  height: 50px;
  z-index: 2;
  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: red;
    color: white;
    text-align: center;
    position: fixed;
    top: 0;
  }
}
</style>