<template>
<div>
  お気に入りから削除しています。
</div>
</template>

<script>
import { defineComponent, onMounted } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from "vuex";
import {getCode, getBookmarkId} from "@/authorization";


export default defineComponent({
  setup() {
    const store = useStore()
    const router = useRouter()

    onMounted(() => {
			const updateCode = getCode()
			const bookmarkId = getBookmarkId()
			// updateCode が存在していたら削除
			if(updateCode) {
				store.dispatch('AuthorizationCodeState/setUpdateCode', updateCode)
				store.dispatch('FavoriteState/updateMyFavoriteBookmark', {action: 'delete', code: updateCode, id: bookmarkId})
        setTimeout(() => {
          router.push('/')
        }, 2000)
			}
		})

    return {}
  },
})
</script>
