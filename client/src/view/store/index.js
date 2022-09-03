import { createStore } from 'vuex'
import TestApiState from './TestApiState'
import UserApiState from './UserApiState'
import BookSearchState from './BookSearchState'

export default createStore({
  modules: {
    TestApiState,
    UserApiState,
    BookSearchState
  }
})
