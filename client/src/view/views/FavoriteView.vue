<template>
  <div class="favorite-bookmark">
    <a :href='targetHref'>Link</a>
    <div  class="favorite-bookmark__cards">
      <a v-for="item of favoriteItems" class="favorite-bookmark__card" :key="item.id" @click="onClickDetail(item.id)">
        <img :src="item.mediumImageUrl" alt="">
        <p>{{item.itemName}}</p>
      </a>
    </div>
  </div>
</template>

<script>
import { computed, defineComponent, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

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
    const router = useRouter()

    const REDIRECT_URL = 'http://localhost:8080/favorite'
    const encodedRedirectUri = encodeURI(REDIRECT_URL);

    const targetHref = `https://app.rakuten.co.jp/services/authorize?client_id=1024937239498592249&response_type=code&scope=rakuten_favoritebookmark_read&redirect_uri=${encodedRedirectUri}`

    const favoriteItems = computed(() => {
      const items = store.state.FavoriteState.favoriteItems
      return items.map((item) => {
        return {
          ...item,
          itemName: item.itemName.slice(0, 40),
        };
      })
    })



    onMounted(() => {
      const code = getCode()
      if(!code) return
      store.dispatch('FavoriteState/fetch', {code})
    })

    const onClickDetail = (id) => {
			store.dispatch('FavoriteState/setSelectedItemId', id)
			router.push('/favorite-detail');
		}

    return {
      favoriteItems,
      targetHref,
      onClickDetail
    }
  },
})
</script>
<style scoped lang="scss">
  .favorite-bookmark {
    padding: 0 16px;

    &__cards {
      width: 100%;
      margin: 36px auto;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    &__card {
      display: inline-block;
      min-width: 200px;
      width: 30%;
      cursor: pointer;
      border-radius: 10px;
      box-shadow: 0 2px 5px #ccc;
      margin-bottom: 24px;
    }
  }
</style>