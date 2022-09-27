<template>
	<div :item="item" class="book-search__card" :key="item.id">
		<div @click="$emit('onClickDetail')">
			<img :src="item.imageUrl" alt="">
			<p>{{item.itemName}}</p>
			<p v-if="item.itemPrice">¥{{item.itemPrice.toLocaleString()}} (税込)</p>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		item: {
			type: Object,
			default: () => {},
			required: true
		}
	},
	setup() {
		return {}
	}
})
</script>

<style scoped lang="scss">
.book-search__card {
	display: inline-block;
	min-width: 200px;
	width: 30%;
	cursor: pointer;
	border-radius: 10px;
	box-shadow: 0 2px 5px #ccc;
	margin-bottom: 24px;
}
</style>