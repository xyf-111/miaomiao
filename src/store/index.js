import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
// 对vuex进行模块化引入
import city from './city'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowplaying_filmlists: [],
    searchlists: [],
    searchFilterlists: [],
    pullDownMsg: '',
    isColor: true,
    isLoading: true,
    isActive: null
  },
  mutations: {
    nowplayingMutation(state, data) {
      state.nowplaying_filmlists = data
      state.isLoading = false
    },
    isActiveMutation(state, data) {
      state.isActive = data
    },
    noActiveMutation(state, data) {
      state.isActive = data
    },
    searchMutation(state, data) {
      state.searchlists = data
    },
    searchFilterMutation(state, data) {
      var lists = state.searchlists
      var newlists = lists.map(item => item.nm)
      state.searchFilterlists = lists.filter(item => item.nm.match(data))
    },
    handleScollMutation(state, data) {
      state.pullDownMsg = data
      state.isColor = true
    },
    handleTouchMutation(state, data) {
      state.pullDownMsg = data
      state.isColor = false
      setTimeout(() => {
        state.pullDownMsg = ''
      }, 500);
    }
  },
  actions: {
    nowplayingAction(store, id) {
      // axios.get('/ajax/movieOnInfoList?token=').then((res) => {
      //   store.commit('nowplayingMutation', res.data.movieList)
      // })
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=1&k=2866068`,
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.0.4","e":"16218339231241331447889921"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then((res) => {
        store.commit('nowplayingMutation', res.data.data.films)
      })
    },
    searchAction(store) {
      axios.get('/ajax/movieOnInfoList?token=').then((res) => {
        console.log('搜索页面请求到的数据对象是：')
        console.log(res.data)
        store.commit('searchMutation', res.data.movieList)
      })
    }
  },

  modules: {
    city
  }
})
