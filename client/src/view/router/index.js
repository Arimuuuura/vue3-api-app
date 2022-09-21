import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UsersView from '../views/UsersView.vue'
import BookSearch from '../views/BookSearch.vue'
import BookSearchDetail from '../views/BookSearchDetail.vue'
import Favorite from '../views/FavoriteView.vue'
import FavoriteDetail from '../views/FavoriteDetail.vue'
import TestView from '../views/TestApiView.vue'

import getCode from "@/view/authorization";

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
    path: '/search',
    name: 'search',
    component: BookSearch
  },
  {
    path: '/search-detail',
    name: 'searchDetail',
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
    path: '/test',
    name: 'test',
    component: TestView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// ナビゲーションガード
router.beforeEach(async (to, from, next) => {
  // const toName = ''
  const code = getCode()
  console.log(to.name);
  // console.log(code);
  if(!code) {
    if(to.name == 'search') {
      const REDIRECT_URL = 'http://localhost:8080/search'
      const encodedRedirectUri = encodeURI(REDIRECT_URL);
      const targetHref = `https://app.rakuten.co.jp/services/authorize?client_id=1024937239498592249&response_type=code&scope=rakuten_favoritebookmark_read&redirect_uri=${encodedRedirectUri}`

      window.location = targetHref
      return
    }
    // if(to.name == 'searchDetail') {
    //   console.log(to.name);
    //   const REDIRECT_URL = 'http://localhost:8080/search-detail'
    //   const encodedRedirectUri = encodeURI(REDIRECT_URL);
    //   const targetHref = `https://app.rakuten.co.jp/services/authorize?client_id=1024937239498592249&response_type=code&scope=rakuten_favoritebookmark_read&redirect_uri=${encodedRedirectUri}`

    //   window.location = targetHref
    //   return
    // }
    if(to.name == 'favorite') {
      const REDIRECT_URL = 'http://localhost:8080/favorite'
      const encodedRedirectUri = encodeURI(REDIRECT_URL);
      const targetHref = `https://app.rakuten.co.jp/services/authorize?client_id=1024937239498592249&response_type=code&scope=rakuten_favoritebookmark_read&redirect_uri=${encodedRedirectUri}`

      window.location = targetHref
      return
    }
  }
  next()
})

export default router
