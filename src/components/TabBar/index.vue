<template>
  <div id='tabbar'>
    <ul>
      <router-link to='/movie' tag='li'>
        <i class='iconfont iconstrawberry'>电影</i>
      </router-link>
      <router-link to='/cinema' tag='li'>
        <i class='iconfont iconhistory'>影院</i>
      </router-link>
      <router-link to='/mine' tag='li'>
        <i class='iconfont iconauto'>我的</i>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TabBar'
}
</script>

<style lang="scss" scoped>
#tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 16px;
  ul {
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: lightgray;
    // 路由点击时改变样式的另外一种写法：
    li.router-link-active {
      color: red;
    }
    li {
      flex-grow: 1;
    }
  }
}
</style>