<template>
  <div class="products-search">
    <InputForm
      @change="inputKeyword"
      :enteredKeyword="enteredKeyword"
      @onClickSearch="onClickSearch"
    />
    <div class="products-search__cards">
      <ProductCard
        v-for="item of result"
        :key="item.id"
        :item="item"
        @onClickDetail="onClickDetail(item.id)"
      />
    </div>
  </div>
</template>

<script>
import {computed, defineComponent, ref, onMounted} from 'vue'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'
import {getCode} from '@/authorization'
import InputForm from '@/view/views/components/InputForm.vue'
import ProductCard from '@/view/views/components/ProductCard.vue'

export default defineComponent({
  components: {
    InputForm,
    ProductCard,
  },
  setup() {
    const enteredKeyword = ref('')
    const store = useStore()
    const router = useRouter()

    const result = computed(() => {
      const result = store.state.ProductsSearchState.result
      return result.map((item) => {
        return {
          ...item,
          itemName: item.itemName.slice(0, 40),
        }
      })
    })

    onMounted(() => {
      const updateCode = getCode()
      store.dispatch('AuthorizationCodeState/setUpdateCode', updateCode)
    })

    const onClickSearch = () => {
      store.dispatch(
        'ProductsSearchState/getSearchResult',
        enteredKeyword.value
      )
      store.dispatch('ProductsSearchState/setKeyword', enteredKeyword.value)
    }

    const onClickDetail = (id) => {
      store.dispatch('ProductsSearchState/setSelectedItemId', id)
      router.push('/products-search-detail')
    }

    const inputKeyword = (e) => {
      enteredKeyword.value = e.target.value
    }

    return {
      enteredKeyword,
      onClickSearch,
      onClickDetail,
      result,
      InputForm,
      inputKeyword,
      ProductCard,
    }
  },
})
</script>

<style scoped lang="scss">
.products-search {
  padding: 0 16px;

  &__cards {
    width: 100%;
    margin: 36px auto;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
