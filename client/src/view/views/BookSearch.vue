<template>
	<div class="book-search">
		<div class="book-search__input-area">
			<input class="book-search__input-form" v-model="inputValue" type="text">
			<div class="book-search__input-button" @click="onClickSearch">検索</div>
		</div>
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
		const inputValue = ref("")
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
			store.dispatch('BookSearchState/getSearchResult', inputValue.value)
			store.dispatch('BookSearchState/setKeyword', inputValue.value)
		}

		const onClickDetail = (id) => {
			store.dispatch('BookSearchState/setSelectedItemId', id)
			router.push('/book-search-detail');
		}

		return {
			inputValue,
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

	&__input {
		&-area {
			display: flex;
			justify-content:flex-end;
		}

		&-form {
			margin-right: 8px;
			padding: 4px;
			font-size: 16px;
			height: 30px;
			line-height: 30px;
			width: 200px;
			border-radius: 5px;
			border: 1px solid #999;
		}

		&-button {
			height: 30px;
			line-height: 30px;
			width: 80px;
			border: 1px solid #999;
			border-radius: 5px;
			background-color: skyblue;
			cursor: pointer;
		}
	}

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