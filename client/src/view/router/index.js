import { createRouter, createWebHistory } from 'vue-router'
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

import {getCode} from "@/authorization";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView
  },
  {
    path: '/products-search',
    name: 'productsSearch',
    component: ProductsSearch
  },
  {
    path: '/products-search-detail',
    name: 'productsSearchDetail',
    component: ProductsSearchDetail
  },
  {
    path: '/book-search',
    name: 'bookSearch',
    component: BookSearch
  },
  {
    path: '/book-search-detail',
    name: 'bookSearchDetail',
    component: BookSearchDetail
  },
  {
    path: '/favorite',
    name: 'favorite',
    component: Favorite
  },
  {
    path: '/favorite-detail',
    name: 'favoriteDetail',
    component: FavoriteDetail
  },
  {
    path: '/delete-favorite',
    name: 'deleteFavorite',
    component: CushionDeleteFavorite
  },
  {
    path: '/test',
    name: 'test',
    component: TestView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const makeTargetHref = (scope, encodedRedirectUri) => {
  return `https://app.rakuten.co.jp/services/authorize?client_id=1024937239498592249&response_type=code&scope=${scope}&redirect_uri=${encodedRedirectUri}`
}

// ナビゲーションガード
router.beforeEach(async (to, from, next) => {
  const code = getCode(to.fullPath)
  let bookmarkId = ''

  // 商品検索画面
  if(to.name == 'productsSearch') {
    if (code) {
      next()
      return
    }
    if(from.name == 'productsSearchDetail') {
      next()
      return
    }
    const REDIRECT_URL = 'http://localhost:8080/products-search'
    const encodedRedirectUri = encodeURI(REDIRECT_URL);
    const targetHref = makeTargetHref('rakuten_favoritebookmark_update', encodedRedirectUri)

    window.location = targetHref
    return
  }

  // お気に入り画面
  if(to.name == 'favorite') {
    if (code) {
      // if(from.name == 'deleteFavorite') {
      //   const REDIRECT_URL = 'http://localhost:8080/favorite'
      //   const encodedRedirectUri = encodeURI(REDIRECT_URL);
      //   const targetHref = makeTargetHref('rakuten_favoritebookmark_read', encodedRedirectUri)

      //   window.location = targetHref
      // }

      next()
      return
    }
    if(from.name == 'favoriteDetail') {
      next()
      return
    }
    const REDIRECT_URL = 'http://localhost:8080/favorite'
    const encodedRedirectUri = encodeURI(REDIRECT_URL);
    const targetHref = makeTargetHref('rakuten_favoritebookmark_read', encodedRedirectUri)

    window.location = targetHref
    return
  }

  // お気に入り削除時のクッションページ
  if(to.name == 'deleteFavorite') {
    if (code) {
      next()
      return
    }
    bookmarkId = from.query.bookmarkId
    const REDIRECT_URL = `http://localhost:8080/delete-favorite?bookmarkId=${bookmarkId}`
    const encodedRedirectUri = encodeURI(REDIRECT_URL);
    const targetHref = makeTargetHref('rakuten_favoritebookmark_update', encodedRedirectUri)

    window.location = targetHref
    return
  }

  next()
})

export default router
