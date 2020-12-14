import Vue from 'vue'
import Vuex from 'vuex'

if (!(window as any).Vuex) Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      stuid: '',
      role:'',
      username: '',
      access_token: '',
      medicalsignup:''
    },
    title:"首页",
    patient_name:""
  },
  mutations: {
    committitle (state,title) {
      state.title=title
    },
    medicalsignup(state,role){
      state.user.role=role,
      state.user.medicalsignup="Y"
    }
  },
  actions: {
  },
  modules: {
  }
})
