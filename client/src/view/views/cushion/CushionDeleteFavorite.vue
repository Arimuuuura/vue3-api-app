<template>
  <div>
    {{ message }}
  </div>
</template>

<script>
import {computed, defineComponent, onMounted, ref, watch} from 'vue'
import {useRouter} from 'vue-router'
import {useStore} from 'vuex'
import {getValueByQueryParameter} from '@/authorization'

export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()
    const message = ref('登録解除処理中...')

    onMounted(() => {
      const updateCode = getValueByQueryParameter('code')
      const bookmarkId = getValueByQueryParameter('bookmarkId')
      // updateCode が存在していたら削除
      if (updateCode) {
        store.dispatch('AuthorizationCodeState/setUpdateCode', updateCode)
        store.dispatch('FavoriteState/updateMyFavoriteBookmark', {
          action: 'delete',
          code: updateCode,
          id: bookmarkId,
        })
      }
      message.value = '登録解除処理中...'
    })

    const updatedResponse = computed(() => {
      return store.state.FavoriteState.updatedResponse
    })

    watch(
      () => updatedResponse.value,
      (res) => {
        if (res) {
          message.value = 'お気に入り登録を解除しました。'
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }
      }
    )

    return {
      message,
    }
  },
})
</script>
