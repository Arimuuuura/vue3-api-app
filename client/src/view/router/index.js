import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import UsersView from '../views/UsersView.vue'
import BookSearch from '../views/BookSearch.vue'
import BookSearchDetail from '../views/BookSearchDetail.vue'
import Favorite from '../views/FavoriteView.vue'
import TestView from '../views/TestApiView.vue'

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
    path: '/test',
    name: 'test',
    component: TestView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
