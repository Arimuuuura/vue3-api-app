<template>
	<div class="search-box">
		<input class="search-box__input" :v-model="enteredKeyword" type="text">
		<div class="search-box__button" @click="$emit('onClickSearch')">検索</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		enteredKeyword: {
			type: String,
			default: '',
			required: true
		}
	},
	setup() {
		return {}
	}
})
</script>

<style scoped lang="scss">
.search-box {
	display: flex;
	justify-content:flex-end;

	&__input {
		margin-right: 8px;
		padding: 4px;
		font-size: 16px;
		height: 30px;
		line-height: 30px;
		width: 200px;
		border-radius: 5px;
		border: 1px solid #999;
	}

	&__button {
		height: 30px;
		line-height: 30px;
		width: 80px;
		border: 1px solid #999;
		border-radius: 5px;
		background-color: skyblue;
		cursor: pointer;
	}
}
</style>