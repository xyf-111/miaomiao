<template>
  <div id='movie'>
    <Header title='喵喵电影'></Header>
    <ul class='movie-header'>
      <router-link to='/movie/city' tag='li'>城市</router-link>
      <router-link to='/movie/nowplaying' tag='li'>正在热映</router-link>
      <router-link to='/movie/commingsoon' tag='li'>即将上映</router-link>
      <router-link to='/movie/search' tag='li'>搜索</router-link>
    </ul>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
export default {
  name: 'Movie',
  components: {
    Header,
    TabBar
  }
}
</script>

<style lang="scss" scoped>
#movie {
  width: 100%;
  .movie-header {
    width: 100%;
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #666;
    li {
      flex-grow: 1;
    }
    li.router-link-active {
      color: red;
      border-bottom: 2px solid red;
    }
  }
}
</style>