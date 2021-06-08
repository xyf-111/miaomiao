<template>
  <div id='cinemalists_body'>
    <Loading v-if='isLoading'></Loading>
    <Scroll v-else :handleScoll='handleScoll' :handleTouch='handleTouch'>
      <ul id='cinemalists'>
        <li v-if='pullDownMsg' style='height:30px'>{{pullDownMsg}}</li>
        <li v-for='item in cinemalists' :key='item.cinemaId'>
          <div>
            <h4>{{item.name}}</h4>
            <p>{{item.address}}</p>
          </div>
          <div>
            <p>{{item.lowPrice/100}}起</p>
            <p>{{Math.round(item.Distance*1000)}}km</p>
          </div>
        </li>
      </ul>
    </Scroll>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Cinemalists',
  data() {
    return {
      cinemalists: [],
      pullDownMsg: '',
      isLoading: true
    }
  },
  // 在keep-alive 组件激活时，应该用activated生命周期钩子
  activated() {
    var cityid = window.localStorage.getItem('nowCityid')
    if (!cityid) {
      cityid = this.$store.state.city.id
    }
    console.log('111')
    console.log(cityid)
    axios({
      url: `https://m.maizuo.com/gateway?cityId=${cityid}&ticketFlag=1&k=5148931`,
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then((res) => {
      console.log(res.data.data.cinemas)
      this.cinemalists = res.data.data.cinemas
      this.isLoading = false
    })
  },
  methods: {
    handleScoll(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = '正在更新中.......'
      }
    },
    handleTouch(pos) {
      if (pos.y > 30) {
        this.pullDownMsg = '更新成功！！！'
        setTimeout(() => {
          this.pullDownMsg = ''
        }, 1000)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
#cinemalists_body {
  height: 600px;
}
#cinemalists {
  li {
    height: 70px;
    display: flex;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    div {
      overflow: hidden;
      height: 100%;
      h4 {
        overflow: hidden;
        height: 50%;
        display: block;
        margin-bottom: 5px;
      }
      p {
        font-size: 12px;
        color: #666;
        overflow: hidden;
        display: block;
        height: 50%;
      }
      &:first-child {
        width: 80%;
      }
      &:last-child {
        width: 20%;
        text-align: center;
        p {
          &:first-child {
            font-size: 16px;
            color: red;
            margin-bottom: 5px;
          }
        }
      }
    }
  }
}
</style>