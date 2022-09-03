import { createApp } from 'vue'
import App from './view/App.vue'
import router from './view/router'
import store from './view/store'
import {init as httpDriver} from '@/driver/HttpDriver'
import {init as userApiInit} from '@/api/UserApi'
import {init as bookSearchApiInit} from '@/api/BookSearchApi'
import {init as userApiState} from '@/view/store/UserApiState'
import {init as bookSearchState} from '@/view/store/BookSearchState'

// driver 初期化
httpDriver()

// api 初期化
userApiInit()
bookSearchApiInit()

// state 初期化
userApiState()
bookSearchState()

// test code
import {init as testApiInit} from '@/api/TestApi'
import {init as testApiState} from '@/view/store/TestApiState'
testApiInit()
testApiState()

createApp(App).use(store).use(router).mount('#app')
