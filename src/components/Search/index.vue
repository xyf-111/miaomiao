<template>
  <div id='search'>
    <mt-search v-model="searchValue" @input='searchMethod'>
      <mt-cell v-for="item in searchFilterlists" :key='item.id' show='true'>
        <div>
          <img :src="item.img | setWH(/100.200/)" alt="">
        </div>
        <div>
          <h4>{{item.nm}}</h4>
          <p>主演：{{item.star}}</p>
          <p>{{item.rt}}上映</p>
          <p>{{item.showInfo}}</p>
        </div>
      </mt-cell>
    </mt-search>

    <!-- <div class="mint-search">

      <div class="mint-searchbar">
        <div class="mint-searchbar-inner">
          <i class="mintui mintui-search"></i>
          <input type="search" placeholder="搜索" class="mint-searchbar-core" v-model="searchValue" @input='searchMethod'>
        </div>
        <a class="mint-searchbar-cancel" style="color:#666">
          取消
        </a>
      </div>

      <div class="mint-search-list" style="">
        <div class="mint-search-list-warp">
          <a class="mint-cell">
            <div class="mint-cell-wrapper">
              <div class="mint-cell-value" v-for="item in searchFilterlists" :key='item.id'>
                <div>
                  <img :src="item.img | setWH(/100.200/)" alt="">
                </div>
                <div>
                  <h4>{{item.nm}}</h4>
                  <p>主演：{{item.star}}</p>
                  <p>{{item.rt}}上映</p>
                  <p>{{item.showInfo}}</p>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div> 

    </div>-->

  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  mounted() {
    this.$store.dispatch('searchAction')
  },
  data() {
    return {
      searchValue: ''
    }
  },
  // 使用watch可以实现实时监听
  watch: {
    searchValue(newValue) {
      console.log(newValue)
    }
  },
  methods: {
    searchMethod() {
      if (this.searchValue) {
        this.$store.commit('searchFilterMutation', this.searchValue)
      }
    }
  },
  // filters: {
  //   // 局部过滤器的写法
  //   // formatImgurl(url) {
  //     // return url.replat
  //   }
  // },
  computed: {
    ...mapState(['searchlists', 'searchFilterlists'])
  }
}
</script>

<style lang="scss">
// 定义全局样式，主要是为了解决mintui无法局部修改样式的问题
#search {
  width: 100%;
  .mint-search {
    height: 514px;
    position: relative;
    .mint-searchbar {
      .mint-searchbar-inner {
        .mintui-search {
          font-size: 20px;
        }
        .mint-searchbar-core {
          padding-left: 8px;
          font-size: 14px;
        }
      }
    }
    .mint-search-list {
      width: 100%;
      display: flex;
      .mint-search-list-warp {
        width: 100%;
        .mint-cell {
          width: 100%;
          .mint-cell-wrapper {
            width: 100%;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            .mint-cell-value {
              margin-bottom: 10px;
              width: 100%;
              display: flex;
              flex-direction: row;
              div {
                padding-right: 10px;
                &:last-child {
                  h4 {
                    margin-bottom: 10px;
                    display: block;
                    color: black;
                  }
                  p {
                    height: 20px;
                    line-height: 20px;
                    margin-top: 5px;
                    overflow: hidden;
                  }
                }
              }
            }
          }
        }
      }

      // div {
      //   flex-grow: 2;
      //   // width: 600px;
      //   overflow: hidden;
      // }
    }
  }
}
</style>