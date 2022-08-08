import { createStore } from 'vuex'
import TestApiState from './TestApiState'
import UserApiState from './UserApiState'

export default createStore({
  modules: {
    TestApiState,
    UserApiState
  }
})
