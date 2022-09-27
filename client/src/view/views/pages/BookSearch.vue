<template>
	<div class="book-search">
		<InputForm @change="inputKeyword" :enteredKeyword="enteredKeyword" @onClickSearch="onClickSearch" />
		<div  class="book-search__cards">
			<ProductCard v-for="item of result" :key="item.id" :item="item" @onClickDetail="onClickDetail(item.id)" />
		</div>
	</div>
</template>

<script>
import { computed, defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import InputForm from '@/view/views/components/InputForm.vue';
import ProductCard from '@/view/views/components/ProductCard.vue';

export default defineComponent({
	components: {
		InputForm,
		ProductCard
	},
	setup() {
		const enteredKeyword = ref("")
		const store = useStore()
		const router = useRouter()

		const keyword = computed(() => {
			return store.state.BookSearchState.keyword
		})

		const result = computed(() => {
			return store.state.BookSearchState.result
		})

		onMounted(() => {
			if (keyword.value) return
			store.dispatch('BookSearchState/fetch')
		})

		const onClickSearch = () => {
			store.dispatch('BookSearchState/getSearchResult', enteredKeyword.value)
			store.dispatch('BookSearchState/setKeyword', enteredKeyword.value)
		}

		const onClickDetail = (id) => {
			store.dispatch('BookSearchState/setSelectedItemId', id)
			router.push('/book-search-detail');
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
			ProductCard
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
}
</style>