import Vue from 'vue'
import Vuex from 'vuex'

if (!(window as any).Vuex) Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      stuid: '',
      role:'',
      username: '',
      access_token: ''
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
