<template>
  <div id='film_nowplaying' ref='film_nowplaying'>
    <Loading v-if='isLoading'> </Loading>
    <Scroll v-else :handleScoll='handleScoll' :handleTouch='handleTouch'>
      <ul id='nowplaying'>
        <li v-if="pullDowmMsg" style='height:30px' :style="'color:'+(isColor?'red':'green')">{{pullDowmMsg}}</li>
        <li v-for='item in filmlists' :key='item.filmId'>
          <div><img :src="item.poster" alt="" @touchstart=' handleToDetail(item.filmId)'>
          </div>
          <ul class='nowplaying-info'>
            <li @touchstart='handleToDetail(item.filmId)'>{{item.name}} <span>{{item.filmType.name}}</span></li>
            <li>观众评分 {{item.grade}}</li>
            <li>主演：{{item.actors | actorsFilter}}</li>
            <li>{{item.nation}} | {{item.runtime}}分钟</li>
          </ul>
          <div class=' nowplaying-ticket'>
            <div>预 购</div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>
<script>
import Vue from 'vue'
// import axios from 'axios'
// 在入口文件统一引入axios，使用时要加this
// import BScroll from 'better-scroll'
Vue.filter('actorsFilter', function (actor) {
  return actor.map((item) => item.name).join(' ')
})
export default {
  name: 'Commingsoon',
  data() {
    return {
      filmlists: [],
      pullDowmMsg: '',
      isColor: true,
      pageNum: 1,
      isLoading: true,
      prevId: -1
    }
  },
  activated() {
    this.$store.commit('noActiveMutation', false)
    var cityId = this.$store.state.city.id
    if (this.prevId === cityId) {
      console.log('不渲染commingsoon数据', cityId, this.prevId)
      return
    } else {
      console.log('重新渲染commingsoon数据', cityId, this.prevId)
      this.axios({
        url: `https://m.maizuo.com/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=2&k=3245487`,
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        console.log(res.data.data.films)
        this.filmlists = res.data.data.films
        this.isLoading = false
        this.prevId = cityId
        //除了下述设置scoll外，还可以封装成组件使用
        // this.$nextTick(() => {
        //   var Scroll = new BScroll(this.$refs.film_nowplaying, {
        //     tap: true,
        //     click: true,
        //     probeType: 1
        //   })
        //   Scroll.on('scroll', (pos) => {
        //     if (pos.y > 30) {
        //       console.log(this.pageNum)
        //       if (this.pageNum === 3) {
        //         this.pullDowmMsg = '没有可更新的内容!!!'
        //         this.isColor = true
        //         return
        //       }
        //       this.pullDowmMsg = '正在更新中......'
        //       this.isColor = true
        //     }
        //   })
        //   Scroll.on('touchEnd', (pos) => {
        //     if (pos.y > 30) {
        //       if (this.pageNum > 2) {
        //         this.pullDowmMsg = ''
        //         return
        //       } else {
        //         this.pageNum++
        //       }
        //       this.axios({
        //         url: `https://m.maizuo.com/gateway?cityId=440300&pageNum=${this.pageNum}&pageSize=10&type=2&k=3245487`,
        //         headers: {
        //           'X-Client-Info':
        //             '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
        //           'X-Host': 'mall.film-ticket.film.list'
        //         }
        //       }).then((res) => {
        //         this.isColor = false
        //         this.pullDowmMsg = '更新成功！！！'
        //         setTimeout(() => {
        //           this.filmlists = res.data.data.films
        //           this.pullDowmMsg = ''
        //         }, 1000)
        //       })
        //     }
        //   })
        // })
      })
    }
  },
  methods: {
    handleToDetail(filmId) {
      console.log('点击进入电影详情页,电影ID：' + filmId)
      this.$router.push('/movie/detail/commingsoon/' + filmId)
    },
    handleScoll(pos) {
      if (pos.y > 30) {
        this.pullDowmMsg = '正在更新中......'
        this.isColor = true
      }
    },
    handleTouch(pos) {
      if (pos.y > 30) {
        this.isColor = false
        this.pullDowmMsg = '更新成功！！！'
        setTimeout(() => {
          this.pullDowmMsg = ''
        }, 500)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#film_nowplaying {
  height: 500px;
  #nowplaying {
    width: 100%;
    li {
      display: flex;
      width: 100%;
      height: 150px;
      padding: 15px;
      box-sizing: border-box;
      div {
        width: 30%;
        &:first-child {
          width: 80px;
        }
        img {
          width: 80px;
          height: 100%;
        }
      }
      .nowplaying-info {
        flex-grow: 1;
        height: 100%;
        padding: 10px;
        box-sizing: border-box;
        li {
          height: 20px;
          line-height: 20px;
          padding: 0;
          width: 100%;
          font-size: 14px;
          color: #666;
          &:first-child {
            font-size: 18px;
            color: black;
            margin-bottom: 6px;
            font-weight: bold;
            span {
              background: lightgray;
              color: white;
              font-size: 4px;
              display: inline-block;
              margin-left: 4px;
              height: 14px;
              line-height: 14px;
            }
          }
          &:nth-of-type(3) {
            height: 40px;
            overflow: hidden;
          }
        }
      }
      .nowplaying-ticket {
        display: flex;
        width: 50px;
        div {
          width: 50px;
          margin: auto;
          border: 1px solid red;
          color: red;
          text-align: center;
        }
      }
    }
  }
}
</style>