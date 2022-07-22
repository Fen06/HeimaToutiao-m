import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { setToken, getToken, setSearch, getSearch } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {},
    search: getSearch() || []
  },

  mutations: {
    setuser (state, payload) {
      state.user = payload
      setToken(payload)
    },
    setSearch (state, searchinfo) {
      state.search = searchinfo
      setSearch(searchinfo)
    }
  }
})
