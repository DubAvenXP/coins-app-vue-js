<template>
	<main>
		<Header :links="links"></Header>
		<router-view
			class="container px-5 sm:px-20 py-20 flex justify-center"
		></router-view>
	</main>
</template>

<script>
import { defineAsyncComponent } from 'vue'
export default {
	name: 'App',
	components: {
		Header: defineAsyncComponent(() => import('@/components/PxHeader.vue')),
	},
	setup() {
		return {
			links: [
				{
					title: 'BTC',
					to: { name: 'coin-detail', params: { id: 'bitcoin' } },
				},
				{
					title: 'ETH',
					to: { name: 'coin-detail', params: { id: 'ethereum' } },
				},
				{
					title: 'XRP',
					to: { name: 'coin-detail', params: { id: 'xrp' } },
				},
			],
		}
	},
}
</script>

<style></style>
