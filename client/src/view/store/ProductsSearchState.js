import {
  fetchRequest,
  registerCallback,
  getSearchResult,
} from '@/usecase/ProductsSearchApiInteractor'
import store from '@/view/store/index'

export const init = () => {
  const productsSearchInteractorCallback = {
    fetchResponse: async ({result}) => {
      await store.commit('ProductsSearchState/setResult', {result})
    },
  }

  registerCallback(productsSearchInteractorCallback)
}

export default {
  namespaced: true,
  state: () => {
    return {
      keyword: '',
      result: [],
      selectedItemId: null,
    }
  },
  mutations: {
    setKeyword(state, keyword) {
      state.keyword = keyword
    },
    setResult(state, {result}) {
      state.result = result
    },
    setSelectedItemId(state, id) {
      state.selectedItemId = id
    },
  },
  actions: {
    fetch() {
      fetchRequest()
    },
    getSearchResult(_, keyword) {
      getSearchResult(keyword)
    },
    setKeyword({commit}, keyword) {
      commit('setKeyword', keyword)
    },
    setSelectedItemId({commit}, id) {
      commit('setSelectedItemId', id)
    },
  },
}
