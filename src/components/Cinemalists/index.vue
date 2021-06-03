<template>
  <ul id='cinemalists'>
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
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      cinemalists: []
    }
  },
  mounted() {
    axios({
      url: 'https://m.maizuo.com/gateway?cityId=440300&ticketFlag=1&k=5148931',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then((res) => {
      console.log(res.data.data.cinemas)
      this.cinemalists = res.data.data.cinemas
    })
  }
}
</script>

<style lang="scss" scoped>
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