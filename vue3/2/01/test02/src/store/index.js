import { createStore } from 'vuex'

export default createStore({
  state: {
    a: 1,
    b: 1
  },
  getters: {

  },
  mutations: {
    changeA(state, v) {
      console.log(v)
      state.a = v
    },
    changeB(state, v) {
      state.b = v
    }
  },
  actions: {
    getA(context, v) {
      context.commit('changeA', v)
    }
  },
  modules: {
  }
})
