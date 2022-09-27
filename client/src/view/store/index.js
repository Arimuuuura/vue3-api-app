import {createStore} from 'vuex'
import TestApiState from './TestApiState'
import UserApiState from './UserApiState'
import ProductsSearchState from './ProductsSearchState'
import BookSearchState from './BookSearchState'
import FavoriteState from './FavoriteState'
import AuthorizationCodeState from './AuthorizationCodeState'
import ShowModalState from './ShowModalState'

export default createStore({
  modules: {
    TestApiState,
    UserApiState,
    ProductsSearchState,
    BookSearchState,
    FavoriteState,
    AuthorizationCodeState,
    ShowModalState,
  },
})
