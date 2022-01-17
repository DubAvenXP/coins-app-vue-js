<template>
	<main>
		<Header></Header>
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
}
</script>

<style></style>
