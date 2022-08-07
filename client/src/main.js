import { createApp } from 'vue'
import App from './view/App.vue'
import router from './view/router'
import store from './view/store'
import {init as httpDriver} from '@/driver/HttpDriver'
import {init as testApiInit} from '@/api/TestApi'
import {init as TestApiState} from '@/view/store/TestApiState'

// driver 初期化
httpDriver()

// api 初期化
testApiInit()

// state 初期化
TestApiState()

createApp(App).use(store).use(router).mount('#app')
