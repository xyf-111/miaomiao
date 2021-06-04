import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    nowplaying_filmlists: [],
    searchlists: [],
    searchFilterlists: []
  },
  mutations: {
    nowplayingMutation(state, data) {
      state.nowplaying_filmlists = data
    },
    searchMutation(state, data) {
      state.searchlists = data
    },
    searchFilterMutation(state, data) {
      var lists = state.searchlists
      var newlists = lists.map(item => item.nm)
      state.searchFilterlists = lists.filter(item => item.nm.match(data))
    }
  },
  actions: {
    nowplayingAction(store) {
      axios.get('/ajax/movieOnInfoList?token=').then((res) => {
        store.commit('nowplayingMutation', res.data.movieList)
      })
    },
    searchAction(store) {
      axios.get('/ajax/movieOnInfoList?token=').then((res) => {
        console.log(res.data.movieList)
        store.commit('searchMutation', res.data.movieList)
      })
    }
  },

  modules: {
  }
})
