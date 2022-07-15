import Vue from 'vue'
import Vuex from 'vuex'
// import storage from '@/utils/storage'
import { setToken, getToken } from '@/utils'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getToken() || {}
  },

  mutations: {
    setuser (state, payload) {
      state.user = payload
      setToken(payload)
    }
  }
})
