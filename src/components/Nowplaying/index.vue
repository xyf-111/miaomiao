<template>
  <div id='film_nowplaying' ref='film_nowplaying'>
    <Loading v-if='isLoading'></Loading>
    <Scroll c-else :handleScoll='handleScoll' :handleTouch='handleTouch'>
      <ul id='nowplaying'>
        <li v-if='pullDownMsg' style='height:30px' :style="'color:'+(isColor?'red':'green')">{{pullDownMsg}}</li>
        <li v-for='item in nowplaying_filmlists' :key='item.filmId' @click='handleToDetail'>
          <!-- 为什么这里换成tap以后并不生效呢 -->
          <div><img :src="item.poster" alt=""></div>
          <ul class='nowplaying-info'>
            <li>{{item.name}} <span>{{item.item.name}}</span></li>
            <li>观众评分 {{item.grade}}</li>
            <li>主演：{{  item.actors.map((item)=>item.name).join(' ')  }}</li>
          </ul>
          <div class='nowplaying-ticket'>
            <div>购 票</div>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
// 一般方式添加组件
// import Vue from 'vue'
// import axios from 'axios'
// Vue.filter('actorsFilter', function (actor) {
//   return actor.map((item) => item.name).join(' ')
// })
// 可以做一个全局的过滤器，放在main.js文件中
// export default {
//   data() {
//     return {
//       filmlists: []
//     }
//   },
// mounted() {
// 如果无法配置反向代理，则获取数据的形式如下：
// this.axios({
//   url:
//     'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=2464696',
//   headers: {
//     'X-Client-Info':
//       '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
//     'X-Host': 'mall.film-ticket.film.list'
//   }
// }).then((res) => {
//   console.log(res.data.data.films)
//   this.filmlists = res.data.data.films
// })
// 如果已配置反向代理，则获取数据的形式如下：
// this.axios.get('/ajax/movieOnInfoList?token=').then((res) => {
//   console.log(res.data.movieList)
//   this.filmlists = res.data.movieList
// })
// }
// }

// 通过store方式添加组件
import { mapState } from 'vuex'
// 通过引入组件的方式设置Scroll
import BScroll from 'better-scroll'
export default {
  name: 'Nowplaying',
  // filters: {
  //   actorFilter: function () {}
  // },
  // 在使用keepalive时，如果使用mounted的话，则页面切换时不会重新渲染数据，所以应该换成activated
  data() {
    return {
      previd: -1
    }
  },
  activated() {
    var id = this.$store.state.city.id
    if (id === this.previd) {
      console.log('不渲染nowplaying数据', id, this.previd)
      return
    } else {
      console.log('重新渲染nowplaying数据', id, this.previd)
      this.$store.dispatch('nowplayingAction', id)
      this.previd = id
      this.$store.commit('isActiveMutation', true)
    }

    // console.log(document.querySelectorAll('li'))
    // this.$nextTick(() => {
    //   new BScroll(this.$refs.film_nowplaying, {})
    // })
    // 如果直接在本页面通过AJAX请求数据的话，用上面这种方式就可以了，但是使用Vuex的话，由于数据虽然获取了，但是还来不及渲染到DOM节点，所以直接初始化会实现不了滚动效果，所以添加了延时器，下述两种写法都可以,或者还可以换一个生命周期来写
    // 写法1：
    // setTimeout(() => {
    //   this.$nextTick(() => {
    //     new BScroll(this.$refs.film_nowplaying, {
    //       tap: true,
    //       click: true
    //     })
    //   })
    // }, 2000)
    // 写法2：
    setTimeout(() => {
      new BScroll(this.$refs.film_nowplaying, {
        tap: true,
        click: true
      })
    }, 200)
  },
  // beforeUpdate() {
  //   this.$nextTick(() => {
  //     new BScroll(this.$refs.film_nowplaying, {
  //       tap: true
  //     })
  //   })
  // },
  computed: {
    ...mapState(['nowplaying_filmlists', 'pullDownMsg', 'isColor', 'isLoading'])
  },
  methods: {
    handleToDetail() {
      console.log('渲染电影详情页')
    },
    handleScoll(pos) {
      if (pos.y > 30) {
        this.$store.commit('handleScollMutation', '正在更新中......')
      }
    },
    handleTouch(pos) {
      if (pos.y > 30) {
        this.$store.commit('handleTouchMutation', '更新成功！！！')
      }
    }
  }
}
// 通过点击进入详情页，移动端一般不要用click，会有延迟，应该用touchstart，但是会有一个问题：无论是点击还是滑动，都会触发事件，这时改用tap会比较好，就是点击会触发，滑动不会触发
// tap的解决途径:zepto 或 vue-touch 或 better-scroll
// 为了解决移动端滑动不流畅的问题,方法是：isscoll 或 better-scroll
// better-scroll使用的时候，父元素的高度一定要小于子元素的高度
</script>

<style lang="scss" scoped>
#film_nowplaying {
  width: 100%;
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
        width: 40%;
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
        padding: 15px;
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
            margin-bottom: 10px;
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