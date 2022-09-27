<template>
	<div>
		<div class="favorite-detail__card">
			<img :src="favoriteItem.imageUrl" alt="">
			<div>
				<h3 class="favorite-detail__card-title">{{favoriteItem.itemName}}</h3>
				<dl class="favorite-detail__card-body">
					<dt class="favorite-detail__card-key">店名</dt>
					<dd class="favorite-detail__card-value">{{favoriteItem.shopName}}</dd>

					<dt class="favorite-detail__card-key">レビュー平均</dt>
					<dd class="favorite-detail__card-value">{{favoriteItem.reviewAverage}}</dd>

					<dt class="favorite-detail__card-key">レビュー件数</dt>
					<dd class="favorite-detail__card-value">{{favoriteItem.reviewCount}}</dd>
				</dl>
				<div class="favorite-detail__card-footer">
					<p class="favorite-detail__card-footer-price">ポイント {{favoriteItem.pointRate}} 倍</p>
					<button class="favorite-detail__card-footer-favorite" @click="onClickDeleteFavorite">お気に入りに登録解除</button>
					<a :href="favoriteItem.itemUrl" class="favorite-detail__card-footer-link">購入ページへ</a>
				</div>
			</div>
		</div>
		<div class="favorite-detail__back-link" @click="onClickBack">戻る</div>
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
			return store.state.FavoriteState.favoriteItems.find(item => item.bookmarkId === selectedItemId.value)
		})

		const onClickDeleteFavorite = () => {
			// 削除 scope 取得用のクッションページ
			router.push('/delete-favorite')
		}

		const onClickBack = () => {
			router.push('/favorite')
		}

		return {
			favoriteItem,
			onClickDeleteFavorite,
			onClickBack
		}
	}
})
</script>

<style scoped lang="scss">
.favorite-detail {
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