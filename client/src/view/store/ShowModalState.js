export default {
  namespaced: true,
  state: () => {
    return {
      isShow: false,
    }
  },
  mutations: {
    setIsShow(state, isShow) {
      state.isShow = isShow
    },
  },
  actions: {
    setIsShow({commit}, isShow) {
      commit('setIsShow', isShow)
    },
  },
}
