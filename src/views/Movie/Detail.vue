<template>
  <div id='detail' class='slide-enter-active'>
    <Header title='影片详情'>
      <span @touchstart='handleToBack'>
        《
      </span>
    </Header>
    <Loading v-if='isLoading'></Loading>
    <div v-else>
      <div class='movieImg'><img :src="detailLists.poster" alt=""></div>
      <div class='movieInfo'>
        <h2>{{detailLists.name}}</h2>
        <p>{{detailLists.category}}</p>
        <p>2021年5月21日上映</p>
        <p>{{detailLists.nation}} | {{detailLists.runtime}}分钟</p>
        <p>{{detailLists.synopsis}}</p>
      </div>
      <div class="actors_swiper-container ">
        <ul class='actors swiper-wrapper'>
          <li class="swiper-slide" v-for='(item,index) in actorsLists' :key='index'>
            <img :src="item.avatarAddress" alt="">
            <p>{{item.name}}</p>
            <p>{{item.role}}</p>
          </li>
        </ul>
      </div>
      <div class="moviePhoto_swiper-container">
        <ul class='moviePhoto swiper-wrapper'>
          <li class="swiper-slide" v-for='(item,index) in moviePhotoLists' :key='index'>
            <img :src="item" alt="">
          </li>
        </ul>
      </div>
      <div class='buyTicket'>
        <h3>选座买票</h3>
      </div>
    </div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import Header from '@/components/Header'
export default {
  name: 'detail',
  data() {
    return {
      detailLists: {},
      actorsLists: [],
      moviePhotoLists: [],
      isLoading: true
    }
  },
  components: {
    Header,
    Swiper
  },
  methods: {
    handleToBack() {
      // 返回上一个路由页面
      this.$router.back()
    }
  },
  // 替代 this.$routes.params.movieId 获取路由的方式：
  props: ['movieId'],
  mounted() {
    // console.log(this.movieId)
    this.axios({
      url: 'https://m.maizuo.com/gateway?filmId=' + this.movieId,
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921","bc":"110100"}',
        'X-Host': 'mall.film-ticket.film.info'
      }
    }).then((res) => {
      this.detailLists = res.data.data.film
      this.actorsLists = res.data.data.film.actors
      this.moviePhotoLists = res.data.data.film.photos
      this.isLoading = false
      this.$nextTick(() => {
        var actorsSwiper = new Swiper('.actors_swiper-container', {
          slidesPerView: 4,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        })
        var moviePhotoSwiper = new Swiper('.moviePhoto_swiper-container', {
          slidesPerView: 3,
          spaceBetween: 10,
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          }
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
#detail {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
  background: white;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  span {
    display: inline-block;
    position: absolute;
    left: 0px;
    width: 50px;
    height: 50px;
  }
  .movieImg {
    width: 100%;
    height: 200px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .movieInfo {
    width: 100%;
    height: 180px;
    font-size: 14px;
    color: #666;
    padding: 10px;
    border-bottom: 10px solid lightgray;
    box-sizing: border-box;
    overflow: hidden;
    h2 {
      font-size: 20px;
      height: 30px;
      line-height: 30px;
    }
    p {
      height: 24px;
      line-height: 24px;
      &:last-child {
        margin-top: 5px;
        margin-bottom: 10px;
        height: 45px;
        overflow: hidden;
      }
    }
  }
  .actors {
    width: 800px;
    padding: 10px;
    height: 180px;
    border-bottom: 10px solid lightgray;
    box-sizing: border-box;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
    li {
      float: left;
      flex-basis: 100px;
      width: 100px;
      height: 150px;
      margin-right: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100px;
        margin-bottom: 5px;
      }
      p {
        height: 20px;
        line-height: 20px;
        overflow: hidden;
      }
    }
  }
  .buyTicket {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    position: fixed;
    bottom: 0;
    left: 0;
    background: orangered;
    color: white;
  }
  .moviePhoto {
    width: 800px;
    padding: 10px;
    height: 180px;
    border-bottom: 10px solid lightgray;
    box-sizing: border-box;
    font-size: 14px;
    overflow: hidden;
    text-align: center;
    li {
      float: left;
      flex-basis: 100px;
      width: 150px;
      height: 150px;
      margin-right: 10px;
      overflow: hidden;
      img {
        width: 100%;
        height: 100px;
        margin-bottom: 5px;
      }
    }
  }
}
.slide-enter-active {
  animation: 0.3s slideMove;
}
@keyframes slideMove {
  0% {
    transform: translateX(100px);
  }
  100% {
    transform: translateX(0px);
  }
}
</style>
