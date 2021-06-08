<template>
  <div id='movie'>
    <Header title='喵喵电影'></Header>
    <div id='movie-header'>
      <ul class='movie-header'>
        <router-link to='/movie/city' tag='li'>{{$store.state.city.nm}}</router-link>
        <router-link to='/movie/nowplaying' tag='li' :class="isActive?'active':''">正在热映</router-link>
        <router-link to='/movie/commingsoon' tag='li'>即将上映</router-link>
        <router-link to='/movie/search' tag='li'>搜索</router-link>
      </ul>
    </div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <TabBar></TabBar>
  </div>
</template>

<script>
import Header from '@/components/Header'
import TabBar from '@/components/TabBar'
import { messageBox } from '@/components/JS'
import { mapState } from 'vuex'
export default {
  name: 'Movie',
  components: {
    Header,
    TabBar
  },
  activated() {
    if (
      window.localStorage.getItem('locationCityid') ===
      this.$store.state.city.id
    ) {
      console.log('已经是当前定位城市了，不用再弹窗了')
      return
    }
    setTimeout(() => {
      console.log('不是当前定位城市，需要弹窗确认定位')
      messageBox({
        title: '定位',
        content: '是否定位当前城市：宁波',
        cancel: '取消',
        ok: '切换定位',
        handleCancel() {
          console.log('取消')
        },
        handleOk() {
          console.log('切换定位')
          window.localStorage.setItem('nowCity', '宁波')
          window.localStorage.setItem('nowCityid', '330200')
          window.localStorage.setItem('locationCityid', '330200')
          window.location.reload()
        }
      })
    }, 2000)
  },
  computed: {
    ...mapState(['isActive'])
  }
}
</script>

<style lang="scss" scoped>
.active {
  color: red;
  border-bottom: 2px solid red;
}
#movie {
  width: 100%;
  #movie-header {
    width: 100%;
    height: 50px;
    position: relative;
  }
  .movie-header {
    width: 100%;
    display: flex;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-bottom: 1px solid #666;
    position: fixed;
    background: white;
    z-index: 2;
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