<template>
  <div class="favorite-bookmark">
    <div class="favorite-bookmark__cards">
      <ProductCard
        v-for="item of favoriteItems"
        :key="item.id"
        :item="item"
        @onClickDetail="onClickDetail(item.bookmarkId)"
      />
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, onMounted} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {getValueByQueryParameter} from '@/authorization'
import ProductCard from '@/view/views/components/ProductCard.vue'

export default defineComponent({
  components: {
    ProductCard,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const favoriteItems = computed(() => {
      const items = store.state.FavoriteState.favoriteItems
      return items.map((item) => {
        return {
          ...item,
          itemName: item.itemName.slice(0, 40),
        }
      })
    })

    onMounted(() => {
      const readCode = getValueByQueryParameter('code')
      store.dispatch('AuthorizationCodeState/setReadCode', readCode)
      if (!readCode) return
      store.dispatch('FavoriteState/fetch', {readCode})
    })

    const onClickDetail = (id) => {
      store.dispatch('FavoriteState/setSelectedItemId', id)
      router.push(`/favorite-detail?bookmarkId=${id}`)
    }

    return {
      favoriteItems,
      onClickDetail,
      ProductCard,
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
