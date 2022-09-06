<template>
	<div class="book-search">
		<input v-model="keyword" type="text">
		<button @click="onClickSearch">検索</button>
		<div  class="book-search__cards">
			<a v-for="item of result" class="book-search__card" :key="item.id" @click="onClickDetail(item.id)">
				<img :src="item.largeImageUrl" alt="">
				<p>{{item.title}}</p>
				<p>¥{{item.itemPrice.toLocaleString()}} (税込)</p>
			</a>
		</div>
	</div>
</template>

<script>
import { computed, defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';

export default defineComponent({
	setup() {
		const keyword = ref("")
		const store = useStore()
		const router = useRouter()

		onMounted(() => {
			store.dispatch('BookSearchState/fetch')
		})

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

<style scoped lang="scss">
.book-search {
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