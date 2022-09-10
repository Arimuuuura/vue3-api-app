import { createStore } from 'vuex'
import TestApiState from './TestApiState'
import UserApiState from './UserApiState'
import BookSearchState from './BookSearchState'
import FavoriteState from './FavoriteState'

export default createStore({
  modules: {
    TestApiState,
    UserApiState,
    BookSearchState,
    FavoriteState
  }
})
