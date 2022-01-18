<template>
	<div class="flex-col">
		<template v-if="coin.id">
			<div class="flex flex-col sm:flex-row justify-around items-center">
				<div class="flex flex-col items-center">
					<img
						:src="`https://static.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`"
						:alt="coin.name"
						class="w-20 h-20 mr-5"
					/>
					<h1 class="text-5xl">
						{{ coin.name }}
						<small class="sm:mr-2 text-gray-500">{{
							coin.symbol
						}}</small>
					</h1>
				</div>

				<div class="my-10 flex flex-col">
					<ul>
						<li class="flex justify-between">
							<b class="text-gray-600 mr-10 uppercase">Ranking</b>
							<span>#{{ coin.rank }}</span>
						</li>
						<li class="flex justify-between">
							<b class="text-gray-600 mr-10 uppercase"
								>Precio actual</b
							>
							<span>{{ dollarFormat(coin.priceUsd) }}</span>
						</li>
						<li class="flex justify-between">
							<b class="text-gray-600 mr-10 uppercase"
								>Precio más bajo</b
							>
							<span>{{min}}</span>
						</li>
						<li class="flex justify-between">
							<b class="text-gray-600 mr-10 uppercase"
								>Precio más alto</b
							>
							<span>{{max}}</span>
						</li>
						<li class="flex justify-between">
							<b class="text-gray-600 mr-10 uppercase"
								>Precio Promedio</b
							>
							<span>{{avg}}</span>
						</li>
						<li class="flex justify-between">
							<b class="text-gray-600 mr-10 uppercase"
								>Variación 24hs</b
							>
							<span>{{percentFormat(coin.changePercent24Hr)}}</span>
						</li>
					</ul>
				</div>

				<div
					class="my-10 sm:mt-0 flex flex-col justify-center text-center"
				>
					<button
						class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					>
						Cambiar
					</button>

					<div class="flex flex-row my-5">
						<label class="w-full" for="convertValue">
							<input
								id="convertValue"
								type="number"
								class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
							/>
						</label>
					</div>

					<span class="text-xl"></span>
				</div>
			</div>
		</template>
	</div>
</template>

<script>
import useCoins from '@/composables/useCoins'
import { useRoute } from 'vue-router'
export default {
	setup() {
		const route = useRoute()
		const { getCoin, coin, dollarFormat, percentFormat, min, max, avg } = useCoins()
		getCoin(route.params.id)
		return {
			coin,
			dollarFormat,
			percentFormat,
			min,
			max,
			avg,
		}
	},
}
</script>

<style></style>
