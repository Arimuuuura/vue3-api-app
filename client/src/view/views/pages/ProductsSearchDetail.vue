<template>
	<div>
		<div class="products-detail__card">
			<img class="products-detail__card-img" :src="result.imageUrl" alt="">
			<div>
				<h3 class="products-detail__card-title">{{result.itemName}}</h3>
				<dl class="products-detail__card-body">
					<dt class="products-detail__card-key">店舗名</dt>
					<a :href="result.shopUrl" class="products-detail__card-value"><dd >{{result.shopName}}</dd></a>

					<dt class="products-detail__card-key" v-if="result.catchcopy">商品説明文</dt>
					<dd class="products-detail__card-value" v-if="result.catchcopy">{{result.catchcopy}}</dd>

					<dt class="products-detail__card-key">レビュー平均</dt>
					<dd class="products-detail__card-value">{{result.reviewAverage}}</dd>

					<dt class="products-detail__card-key">レビュー件数</dt>
					<dd class="products-detail__card-value">{{result.reviewCount}}</dd>
				</dl>
				<div class="products-detail__card-footer">
					<p class="products-detail__card-footer-price">¥{{result.itemPrice.toLocaleString()}} (税込)</p>
					<button class="products-detail__card-footer-favorite" @click="onClickAddFavorite">お気に入りに登録</button>
					<a :href="result.itemUrl" class="products-detail__card-footer-link">購入ページへ</a>
				</div>
			</div>
		</div>
		<div class="products-detail__back-link" @click="onClickBack">戻る</div>
		<ModalWindowVue @click="onClickClose" v-show="isShowModal" :content="message" />
	</div>
</template>

<script>
import { computed, defineComponent, ref, watch} from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import ModalWindowVue from "@/view/views/components/ModalWindow.vue";

export default defineComponent({
	components: {
		ModalWindowVue
	},
	setup() {
		const store = useStore()
		const router = useRouter()
		const message = ref('')

		const selectedItemId = computed(() => {
			return store.state.ProductsSearchState.selectedItemId
		})

		const result = computed(() => {
			return store.state.ProductsSearchState.result[selectedItemId.value]
		})

		const code = computed(() => {
			return store.state.AuthorizationCodeState.updateCode
		})

		const isShowModal = computed(() => {
			return store.state.ShowModalState.isShow
		})

		const updatedResponse = computed(() => {
			return store.state.FavoriteState.updatedResponse
		})

		watch(() => updatedResponse.value, (res) => {
				if(res == 'success') {
					message.value = 'お気に入り登録に成功しました。'
					store.dispatch('ShowModalState/setIsShow', true)
				}
			}
		)

		const onClickAddFavorite = () => {
			const itemCode = result.value.itemCode
			store.dispatch('FavoriteState/updateMyFavoriteBookmark', {action: 'add', code: code.value, id: itemCode})

		}

		const onClickBack = () => {
			router.push('/products-search')
		}

		const onClickClose = () => {
			store.dispatch('ShowModalState/setIsShow', false)
		}

		return {
			ModalWindowVue,
			result,
			message,
			onClickAddFavorite,
			onClickBack,
			isShowModal,
			onClickClose
		}
	}
})
</script>

<style scoped lang="scss">
.products-detail {
	&__card {
		padding: 24px;
		margin: 24px;
		border-radius: 10px;
		box-shadow: 0 2px 5px #ccc;
		display: flex;

		&-img {
			width: 200px;
			height: 200px;
		}

		&-title {
			margin-left: 32px;
			text-align: start;
		}

		&-body {
			margin: 0 32px;
			display: flex;
			flex-wrap: wrap;
		}

		&-key {
			margin-bottom: 4px;
			flex: 0 0 30%;
			text-align: start;
		}

		&-value {
			display: inline-block;
			margin-bottom: 4px;
			flex: 0 0 60%;
			text-align: start;
		}

		&-footer {
			display: flex;
			padding: 8px 32px 0;
			gap: 64px;

			&-price {
				margin: 0;
				font-size: 24px;
				font-weight: bold;
			}

			&-link {
				display: inline-block;
				height: 24px;
				line-height: 24px;
				font-size: 20px;
				font-weight: bold;
				box-shadow: 0 2px 5px #ccc;
				text-decoration: none;
				padding: 8px;
				border-radius: 5px;
				color: #fff;
				background-color: tomato;
			}

			&-favorite {
				line-height: 24px;
				font-size: 20px;
				font-weight: bold;
				box-shadow: 0 2px 5px #ccc;
				padding: 8px;
				border-radius: 5px;
				color: #fff;
				background-color: royalblue;
				border: none;
				cursor: pointer;
			}
		}
	}

	&__back-link {
		margin-right: 24px;
		text-align: end;
		cursor: pointer;
	}
}
</style>