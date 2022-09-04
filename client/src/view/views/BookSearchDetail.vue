<template>
	<div>
		<div>
			<img :src="result.largeImageUrl" alt="">
			<p>{{result.title}}</p>
		</div>
		<p>{{result}}</p>
	</div>
</template>

<script>
import { computed, defineComponent} from "vue";
import { useStore } from "vuex";

export default defineComponent({
	setup() {
		const store = useStore()

		const selectedItemId = computed(() => {
			return store.state.BookSearchState.selectedItemId
		})

		const result = computed(() => {
			return store.state.BookSearchState.result[selectedItemId.value]
		})

		return {
			result
		}
	}
})
</script>

<style>

</style>