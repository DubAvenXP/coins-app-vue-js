/* eslint-disable no-unused-vars */
<template>
	<table>
		<thead>
			<tr class="bg-gray-100 border-b-2 border-gray-400">
				<th></th>
				<th :class="{ up: sortOrder === 1, down: sortOrder === -1 }">
					<span
						class="underline cursor-pointer"
						@click="changeSortOrder"
						>Ranking</span
					>
				</th>
				<th>Nombre</th>
				<th>Precio</th>
				<th>Cap. de Mercado</th>
				<th>Variación 24hs</th>
				<td class="sm:block">
					<input
						class="bg-gray-100 focus:outline-none border-b border-gray-400 py-2 px-4 block w-full appearance-none leading-normal"
						id="filter"
						placeholder="Buscar..."
						type="text"
						v-model="filter"
					/>
				</td>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="asset in filteredAssets"
				:key="asset.id"
				class="border-b border-gray-200 hover:bg-gray-100 hover:bg-orange-100"
			>
				<td>
					<img
						:src="`https://static.coincap.io/assets/icons/${asset.symbol.toLowerCase()}@2x.png`"
						:alt="asset.name"
					/>
				</td>
				<td>{{ asset.rank }}</td>
				<td>
					<router-link
						class="hover:underline text-green-600"
						:to="{
							name: 'coin-detail',
							params: { id: asset.id },
						}"
					>
						{{ asset.name }}
					</router-link>
					<small class="ml-1 text-gray-500">
						{{ asset.symbol }}
					</small>
				</td>
				<td>{{ dollarFormat(asset.priceUsd) }}</td>
				<td>{{ dollarFormat(asset.marketCapUsd) }}</td>
				<td :class="textColor(asset.changePercent24Hr)">
					{{ percentFormat(asset.changePercent24Hr) }}
				</td>
				<td class="hidden sm:block">
					<PxButton @custom-click="goToCoin(asset.id)">
						Detalle
					</PxButton>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import useCoins from '@/composables/useCoins'
import { computed, defineAsyncComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
export default {
	name: 'PxAssetsTable',

	props: {
		assets: {
			type: Array,
			default: () => [],
		},
	},
	components: {
		PxButton: defineAsyncComponent(() =>
			import('@/components/PxButton.vue')
		),
	},
	setup(props) {
		const router = useRouter()
		const { dollarFormat, percentFormat, textColor } = useCoins()
		const filter = ref('')
		const sortOrder = ref(1)
		return {
			dollarFormat,
			percentFormat,
			textColor,
			filter,
			goToCoin: (id) => {
				console.log(id)
				router.push({
					name: 'coin-detail',
					params: { id },
				})
			},
			filteredAssets: computed(() => {
				
				const altOrder = sortOrder.value === 1 ? -1 : 1
				return props.assets
					.filter(
						(asset) =>
							asset.symbol
								.toLowerCase()
								.includes(filter.value.toLowerCase()) ||
							asset.name
								.toLowerCase()
								.includes(filter.value.toLowerCase())
					)
					.sort((a, b) => {
						if (parseInt(a.rank) > parseInt(b.rank)) {
							return sortOrder.value
						}
						return altOrder
					})
			}),
			sortOrder,
			changeSortOrder() {
				sortOrder.value = sortOrder.value === 1 ? -1 : 1
			},
		}
	},
}
</script>

<style scoped>
.up::before {
	content: '👆';
}

.down::before {
	content: '👇';
}

td {
	padding: 20px 0px;
	font-size: 0.6rem;
	text-align: center;
}

th {
	padding: 5px;
	font-size: 0.6rem;
}

@media (min-width: 640px) {
	td,
	th {
		padding: 10px;
		font-size: 1rem;
	}

	th {
		padding: 12px;
	}
}
</style>
