<template>
	<div>
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
		const { coins, getAllCoins } = useCoins()
		getAllCoins()
		return {
			coins,
		}
	},
}
</script>
