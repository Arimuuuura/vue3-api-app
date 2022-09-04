<template>
	<div>
		<input v-model="keyword" type="text">
		<button @click="onClickSearch">検索</button>
		<!-- <div>{{result[0].Item.title}}</div>
		<div>{{result[0].Item.author}}</div> -->
		<div>{{result}}</div>
	</div>
</template>

<script>
import { computed, defineComponent, ref } from "vue";
import { useStore } from "vuex";

export default defineComponent({
	setup() {
		const keyword = ref("")
		const store = useStore()

		const result = computed(() => {
			return store.state.BookSearchState.result
		})

		const onClickSearch = () => {
			console.log('onClick', keyword.value);
			store.dispatch('BookSearchState/getSearchResult', keyword.value)
		}

		return {
			keyword,
			onClickSearch,
			result
		}
	}
})
</script>

<style>

</style>