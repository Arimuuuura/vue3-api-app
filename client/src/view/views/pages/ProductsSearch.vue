<template>
	<div class="products-search">
		<InputForm @change="inputKeyword" :enteredKeyword="enteredKeyword" @onClickSearch="onClickSearch" />
		<div  class="products-search__cards">
			<a v-for="item of result" class="products-search__card" :key="item.id" @click="onClickDetail(item.id)">
				<img :src="item.mediumImageUrls" alt="">
				<p>{{item.itemName}}</p>
				<p>¥{{item.itemPrice.toLocaleString()}} (税込)</p>
			</a>
		</div>
	</div>
</template>

<script>
import { computed, defineComponent, ref, onMounted } from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import {getCode} from "@/authorization";
import InputForm from '@/view/views/components/InputForm.vue';

export default defineComponent({
	components: {
		InputForm
	},
	setup() {
		const enteredKeyword = ref("")
		const store = useStore()
		const router = useRouter()

		const result = computed(() => {
			const result = store.state.ProductsSearchState.result
			return result.map((item) => {
				return {
					...item,
					itemName: item.itemName.slice(0, 40),
				};
			})
		})

		onMounted(() => {
			const updateCode = getCode()
			store.dispatch('AuthorizationCodeState/setUpdateCode', updateCode)
		})

		const onClickSearch = () => {
			store.dispatch('ProductsSearchState/getSearchResult', enteredKeyword.value)
			store.dispatch('ProductsSearchState/setKeyword', enteredKeyword.value)
		}

		const onClickDetail = (id) => {
			store.dispatch('ProductsSearchState/setSelectedItemId', id)
			router.push('/products-search-detail');
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
			inputKeyword
		}
	}
})
</script>

<style scoped lang="scss">
.products-search {
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