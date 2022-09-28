import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/pages/HomeView.vue'
import AboutView from '../views/pages/AboutView.vue'
import UsersView from '../views/pages/UsersView.vue'
import ProductsSearch from '../views/pages/ProductsSearch.vue'
import ProductsSearchDetail from '../views/pages/ProductsSearchDetail.vue'
import BookSearch from '../views/pages/BookSearch.vue'
import BookSearchDetail from '../views/pages/BookSearchDetail.vue'
import Favorite from '../views/pages/FavoriteView.vue'
import FavoriteDetail from '../views/pages/FavoriteDetail.vue'
import CushionDeleteFavorite from '../views/cushion/CushionDeleteFavorite.vue'
import TestView from '../views/pages/TestApiView.vue'
import {getValueByQueryParameter} from '@/authorization'

const APP_URL = process.env.VUE_APP_URL
const GET_CODE_URL = process.env.VUE_APP_AUTHORIZE_URL
const CLIENT_ID = process.env.VUE_APP_APP_ID

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
  },
  {
    path: '/products-search',
    name: 'productsSearch',
    component: ProductsSearch,
  },
  {
    path: '/products-search-detail',
    name: 'productsSearchDetail',
    component: ProductsSearchDetail,
  },
  {
    path: '/book-search',
    name: 'bookSearch',
    component: BookSearch,
  },
  {
    path: '/book-search-detail',
    name: 'bookSearchDetail',
    component: BookSearchDetail,
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite,
  },
  {
    path: '/favorite-detail',
    name: 'favoriteDetail',
    component: FavoriteDetail,
  },
  {
    path: '/delete-favorite',
    name: 'deleteFavorite',
    component: CushionDeleteFavorite,
  },
  {
    path: '/test',
    name: 'test',
    component: TestView,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

const makeTargetHref = (scope, encodedRedirectUri) => {
  return `${GET_CODE_URL}?client_id=${CLIENT_ID}&response_type=code&scope=${scope}&redirect_uri=${encodedRedirectUri}`
}

// ナビゲーションガード
router.beforeEach(async (to, from, next) => {
  const code = getValueByQueryParameter('code', to.fullPath)

  // 商品検索画面
  if (to.name == 'productsSearch') {
    if (code) {
      next()
      return
    }
    if (from.name == 'productsSearchDetail') {
      next()
      return
    }
    const REDIRECT_URL = `${APP_URL}/products-search`
    const targetHref = makeTargetHref(
      'rakuten_favoritebookmark_update',
      encodeURI(REDIRECT_URL)
    )

    window.location = targetHref
    return
  }

  // お気に入り画面
  if (to.name == 'favorite') {
    if (code) {
      next()
      return
    }
    if (from.name == 'favoriteDetail') {
      next()
      return
    }
    const REDIRECT_URL = `${APP_URL}/favorite`
    const targetHref = makeTargetHref(
      'rakuten_favoritebookmark_read',
      encodeURI(REDIRECT_URL)
    )

    window.location = targetHref
    return
  }

  // お気に入り削除時のクッションページ
  if (to.name == 'deleteFavorite') {
    if (code) {
      next()
      return
    }
    const bookmarkId = from.query.bookmarkId
    const REDIRECT_URL = `${APP_URL}/delete-favorite?bookmarkId=${bookmarkId}`
    const targetHref = makeTargetHref(
      'rakuten_favoritebookmark_update',
      encodeURI(REDIRECT_URL)
    )

    window.location = targetHref
    return
  }

  next()
})

export default router
