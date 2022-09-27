import {fetchRequest, registerCallback} from '@/usecase/TestApiInteractor'
import store from '@/view/store/index'

export const init = () => {
  const testApiInteractorCallback = {
    fetchResponse: ({val}) => {
      store.commit('TestApiState/printTest', {val})
    },
  }

  registerCallback(testApiInteractorCallback)
}

export default {
  namespaced: true,
  state: () => {
    return {
      val: 'initial',
    }
  },
  mutations: {
    printTest(state, {val}) {
      state.val = val
    },
  },
  actions: {
    fetch() {
      fetchRequest()
    },
  },
}
