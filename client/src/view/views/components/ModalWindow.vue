<template>
	<div class="overlay">
		<div class="modal-window">
			<div class="modal-window__close"><img src="@/view/assets/highlight_off_black_24dp.svg" alt=""></div>
			<div class="modal-window__content">{{content}}</div>
		</div>
	</div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
	props: {
		content: {
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
.overlay {
	width: 100vw;
	height: 100vh;
	background-color: rgba(26, 28, 33, 0.6);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 5;
	display: flex;
	align-items: center;
	justify-content: center;

	.modal-window {
		width: 70vw;
		height: 50vh;
		background-color: #fff;
		margin: 0 auto;
		opacity: 1;
		border-radius: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

		&__close {
			position: absolute;
			top: 0;
			right: 0;
		}

		&__content {
			font-size: 24px;
			color: #333;
		}
	}
}
</style>