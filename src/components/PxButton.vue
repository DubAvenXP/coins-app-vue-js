<template>
	<button
		@click="onClic"
		class="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-2 border border-green-500 hover:border-transparent rounded"
	>
		<beat-loader :loading="isLoading" color="#68d391" size="8px"></beat-loader>
		<p v-show="!isLoading">
			<slot></slot>
		</p>
	</button>
</template>

<script>
export default {
	props: {
		isLoading: {
			type: Boolean,
			default: false
		}
	},
	name: 'PxButton',
	setup(_, { emit }) {
		return {
			onClic() {
				emit('custom-click')
			},
		}
	},
}
</script>

<style></style>
