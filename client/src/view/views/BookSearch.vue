<template>
	<div>
		<input v-model="keyword" type="text">
		<button @click="onClickSearch">検索</button>
		<div>
			<a v-for="item of result" :key="item.id" @click="onClickDetail(item.id)">
				<img :src="item.largeImageUrl" alt="">
				<p>{{item.title}}</p>
				<p>¥{{item.itemPrice.toLocaleString()}} (税込)</p>
			</a>
		</div>
		<div>{{result}}</div>
	</div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

export default defineComponent({
	setup() {
		const keyword = ref("")
		const store = useStore()
		const router = useRouter()

		const result = computed(() => {
			return store.state.BookSearchState.result
		})

		const onClickSearch = () => {
			store.dispatch('BookSearchState/getSearchResult', keyword.value)
		}

		const onClickDetail = (id) => {
			store.dispatch('BookSearchState/setSelectedItemId', id)
			router.push('/search-detail');
		}

		return {
			keyword,
			onClickSearch,
			onClickDetail,
			result
		}
	}
})
</script>

<style>

</style>