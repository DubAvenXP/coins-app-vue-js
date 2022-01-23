<template>
	<div class="flex flex-column">
		<bounce-loader
			:loading="isLoading"
			color="#68d391"
			size="100px"
		></bounce-loader>
		<AssetsTable :assets="coins"></AssetsTable>
	</div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import useCoins from '@/composables/useCoins'
export default {
	name: 'Home',
	components: {
		AssetsTable: defineAsyncComponent(() =>
			import('@/components/PxAssetsTable.vue')
		),
	},
	setup() {
		const { coins, getAllCoins, isLoading } = useCoins()
		getAllCoins()
		return {
			coins,
			isLoading,
		}
	},
}
</script>
