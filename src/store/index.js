import Vue from 'vue'
import Vuex from 'vuex'

// Vuex + 本地存储（用插件做yarn add vuex-persist ） 做数据持久化
import VuexPersistence from 'vuex-persist'
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {},
    // 存储当前点击的城市名
    currentCity: {},
    // 存储搜索建议
    searchSuggestList: []
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    // 当前点击的城市
    saveCity (state, payload) {
      state.currentCity = payload
    },
    // 搜索建议
    searchSuggestList (state, payload) {
      let arr = state.searchSuggestList
      arr.unshift(payload)
      arr = [...new Set(arr)]
      state.searchSuggestList = arr
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
