<template>
  {{ test }}
  <a :href='targetHref'>Link</a>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { useStore } from "vuex";
import axios from "axios";

const callApi = async () => {
  const params = {
    responseType: 'code',
    clientId: '1024937239498592249',
    scope: 'rakuten_favoritebookmark_read',
    redirectUri: 'http://localhost:8080/'
  }
  
  await axios.get('https://app.rakuten.co.jp/services/authorize', {params})
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.error(err);
  })
  .finally(() => {
  })
}

const getCode = () => {
  const param = location.search
  const nextStringNumber = 1
  const notExist = -1

  if(param.indexOf('&') === notExist) {
    if(param.indexOf('code') === notExist) return

    return param.substring(param.indexOf('=') + nextStringNumber)
  } else {
    const codeParam = param.split('&').find((b) => b.indexOf('code') != notExist)
    return codeParam.substring(codeParam.indexOf('=') + nextStringNumber)
  }
}

export default defineComponent({
  setup() {
    const store = useStore()
    const test = computed(() => {
      return store.state.FavoriteState.body
    })

    const REDIRECT_URL = 'http://localhost:8080/favorite'
    const encodedRedirectUri = encodeURI(REDIRECT_URL);

    const targetHref = `https://app.rakuten.co.jp/services/authorize?client_id=1024937239498592249&response_type=code&scope=rakuten_favoritebookmark_read&redirect_uri=${encodedRedirectUri}`

    onMounted(() => {
      const code = getCode()
      store.dispatch('FavoriteState/getAccessToken', {code})
      // const a = await store.dispatch('FavoriteState/fetch')
      // console.log(a);
      // callApi()
    })

    return {
      test,
      targetHref
    }
  },
})
</script>
