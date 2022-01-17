<template>
	<table>
		<thead>
			<tr class="bg-gray-100 border-b-2 border-gray-400">
				<th></th>
				<th>
					<span>Ranking</span>
				</th>
				<th>Nombre</th>
				<th>Precio</th>
				<th>Cap. de Mercado</th>
				<th>Variación 24hs</th>
				<td class="hidden sm:block"></td>
			</tr>
		</thead>
		<tbody>
			<tr
				v-for="asset in assets"
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
				<td>{{ asset.name }}</td>
				<td>{{ dollarFormat(asset.priceUsd) }}</td>
				<td>{{ dollarFormat(asset.marketCapUsd) }}</td>
				<td :class="textColor(asset.changePercent24Hr)">
					{{ percentFormat(asset.changePercent24Hr) }}
				</td>
				<td class="hidden sm:block"></td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import useCoins from '@/composables/useCoins'
export default {
	name: 'PxAssetsTable',

	props: {
		assets: {
			type: Array,
			default: () => [],
		},
	},
	setup() {
		const { dollarFormat, percentFormat, textColor } = useCoins()
		return {
			dollarFormat,
			percentFormat,
			textColor,
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
