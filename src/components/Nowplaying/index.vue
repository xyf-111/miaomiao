<template>
  <div id='nowplaying'>
    <ul>
      <li v-for='item in filmlists' :key='item.filmId'>
        <div><img :src="item.poster" alt=""></div>
        <ul class='nowplaying-info'>
          <li>{{item.name}} <span>{{item.filmType.name}}</span></li>
          <li>观众评分 {{item.grade}}</li>
          <li>主演：{{item.actors | actorsFilter}}</li>
          <li>{{item.nation}} | {{item.runtime}}分钟</li>
        </ul>
        <div class='nowplaying-ticket'>
          <div>购 票</div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
Vue.filter('actorsFilter', function (actor) {
  return actor.map((item) => item.name).join(' ')
})
export default {
  data() {
    return {
      filmlists: []
    }
  },
  mounted() {
    axios({
      url:
        'https://m.maizuo.com/gateway?cityId=440300&pageNum=1&pageSize=10&type=1&k=2464696',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
        'X-Host': 'mall.film-ticket.film.list'
      }
    }).then((res) => {
      console.log(res.data.data.films)
      this.filmlists = res.data.data.films
    })
  }
}
</script>

<style lang="scss" scoped>
#nowplaying {
  ul {
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
          width: 40%;
        }
        img {
          width: 100%;
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
            font-size: 16px;
            color: black;
            margin-bottom: 5px;
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