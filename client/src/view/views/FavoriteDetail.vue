<template>
	<div>
		<div class="book-detail__card">
			<img :src="favoriteItem.mediumImageUrl" alt="">
			<div>
				<h3 class="book-detail__card-title">{{favoriteItem.itemName}}</h3>
				<dl class="book-detail__card-body">
					<dt class="book-detail__card-key">店名</dt>
					<dd class="book-detail__card-value">{{favoriteItem.shopName}}</dd>

					<dt class="book-detail__card-key">レビュー平均</dt>
					<dd class="book-detail__card-value">{{favoriteItem.reviewAverage}}</dd>

					<dt class="book-detail__card-key">レビュー件数</dt>
					<dd class="book-detail__card-value">{{favoriteItem.reviewCount}}</dd>
				</dl>
				<div class="book-detail__card-footer">
					<a :href="favoriteItem.itemUrl" class="book-detail__card-footer-link">購入ページへ</a>
				</div>
			</div>
		</div>
		<div class="book-detail__back-link" @click="onClickBack">戻る</div>
	</div>
</template>

<script>
import { computed, defineComponent} from "vue";
import { useStore } from "vuex";
import { useRouter } from 'vue-router';


export default defineComponent({
	setup() {
		const store = useStore()
		const router = useRouter()

		const selectedItemId = computed(() => {
			return store.state.FavoriteState.selectedItemId
		})

		const favoriteItem = computed(() => {
			return store.state.FavoriteState.favoriteItems[selectedItemId.value]
		})

		const onClickBack = () => {
			router.push('/favorite')
		}

		return {
			favoriteItem,
			onClickBack
		}
	}
})
</script>

<style scoped lang="scss">
.book-detail {
	&__card {
		padding: 24px;
		margin: 24px;
		border-radius: 10px;
		box-shadow: 0 2px 5px #ccc;
		display: flex;

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
		}
	}

	&__back-link {
		margin-right: 24px;
		text-align: end;
		cursor: pointer;
	}
}
</style>