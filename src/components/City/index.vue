<template>
  <div id='cityLists'>
    <div>
      <div>
        <div id="box" v-show="false"></div>
        <!-- 如果想在页面上看到位置图形的话 -->
        <!-- <div id="box" style="width:100%;height:300px"></div> -->
      </div>
      <Loading v-if='isLoading'></Loading>
      <mt-index-list V-else>
        <mt-index-section :index="item.index" v-for='item in citylists' :key='item.index' ref='myrel'>
          <div v-for='(data,index) in item.citys' :key='index' @click='handleToCity(data.citynm, data.cityid)'>
            <mt-cell :title="data.citynm">
            </mt-cell>
          </div>
        </mt-index-section>
      </mt-index-list>
    </div>
  </div>
</template>

<script>
// 由于axios用到的地方比较多，所以可以在main.js文件中引入,这个组件就不用再单独引入了，但是使用方式需要由 axios 换成 this.axios
// import axios from 'axios'
import { getLocation } from '@/util/location'
import Vue from 'vue'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)
export default {
  name: 'City',
  data() {
    return {
      citylists: [],
      isLoading: true
    }
  },
  mounted() {
    getLocation('box', (data) => {
      console.log(data.replace('市', ''))
    })
  },
  activated() {
    this.$store.commit('noActiveMutation', false)
    var citylists = window.localStorage.getItem('citylists')
    if (citylists) {
      // console.log(window.localStorage.getItem('citylists'))
      this.citylists = JSON.parse(citylists)
      // console.log(this.citylists)
      this.isLoading = false
    } else {
      // 这是不通过配置反向代理获取数据的方式：
      this.axios({
        url: 'https://m.maizuo.com/gateway?k=9922530',
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
          'X-Host': 'mall.film-ticket.city.list'
        }
      }).then((res) => {
        var cityarr = res.data.data.cities
        console.log(cityarr)
        this.formatCity(cityarr)
        this.isLoading = false
        window.localStorage.setItem('citylists', JSON.stringify(this.citylists))
      })
    }
  },
  methods: {
    formatCity(cityarr) {
      for (var i = 65; i < 91; i++) {
        var subcityarr = []
        var letter = String.fromCharCode(i)
        for (var j = 0; j < cityarr.length; j++) {
          if (cityarr[j].pinyin.substring(0, 1) === letter.toLowerCase()) {
            subcityarr.push({
              citynm: cityarr[j].name,
              cityid: cityarr[j].cityId
            })
          }
        }
        if (subcityarr.length) {
          this.citylists.push({
            index: letter,
            citys: subcityarr
          })
        }
      }
    },
    // 如果不使用mint-ui模板，自己创建原生JS时，对于点击字母后跳转相应的城市列表的方法：
    // 首先在组件中添加点击事件：
    // @touchstart='handleIndex'表示在移动端触摸点击引发事件handleIndex
    // 其次在methods中添加方法
    // handleIndex(index) {
    //   var h2 = this.$refs.myrel.getElementsByTagName('h2')
    //   表示可以获取myrel标签或组件里的h2标签
    //   this.$refs.myref.parentNode.scrollTop = h2[index].offsetTop
    // }

    // 如果使用better-scroll，这个点击跳转方法会失效，解决方法如下：
    // 先在组件methods中定义toScrollTop方法：
    // toScrollTop(y){
    //   this.scroll.scrollTo(0,y)
    // }
    // 然后修改本页面methods中的handleIndex方法：
    // handleIndex(index) {
    //   var h2 = this.$refs.myrel.getElementsByTagName('h2')
    //   this.$refs.myref.toScrollTop (-h2[index].offsetTop)
    // }

    handleToCity(nm, id) {
      console.log(nm, id)
      this.$store.commit('city/cityMutation', { nm, id })
      window.localStorage.setItem('nowCity', nm)
      window.localStorage.setItem('nowCityid', id)
      this.$router.push('/movie/nowPlaying')
    }
  }
}
</script>

<style lang="scss" >
// #scollbody {
//   height: 500px;
// }
// #app {
//   #movie {
//     height: 100%;
//     #cityLists {
//       height: 10000px;
//       .mint-indexlist {
//         border: 1px solid green;

//         // ul.mint-indexlist-content {
//         //   // height: 10000px;
//         // }
//         .mint-indexlist-nav {
//           height: 567px;
//           ul.mint-indexlist-navlist {
//             border: 1px solid green;
//           }
//         }
//       }
//     }
//   }
// }
</style>