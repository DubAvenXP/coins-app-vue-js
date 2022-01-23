<template>
	<div class="flex-col">
		<div class="flex justify-center">
			<bounce-loader
				:loading="isLoading"
				color="#68d391"
				size="100px"
			></bounce-loader>
		</div>
		<template v-if="!isLoading">
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
							<span>{{ min }}</span>
						</li>
						<li class="flex justify-between">
							<b class="text-gray-600 mr-10 uppercase"
								>Precio más alto</b
							>
							<span>{{ max }}</span>
						</li>
						<li class="flex justify-between">
							<b class="text-gray-600 mr-10 uppercase"
								>Precio Promedio</b
							>
							<span>{{ avg }}</span>
						</li>
						<li class="flex justify-between">
							<b class="text-gray-600 mr-10 uppercase"
								>Variación 24hs</b
							>
							<span>{{
								percentFormat(coin.changePercent24Hr)
							}}</span>
						</li>
					</ul>
				</div>

				<div
					class="my-10 sm:mt-0 flex flex-col justify-center text-center"
				>
					<button
						@click="toggleConverter"
						class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
					>
						{{
							fromUsd
								? `USD a ${coin.symbol}`
								: `${coin.symbol} a USD`
						}}
					</button>

					<div class="flex flex-row my-5">
						<label class="w-full" for="convertValue">
							<input
								v-model="convertValue"
								id="convertValue"
								type="number"
								class="text-center bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
								:placeholder="`Valor en ${fromUsd ? 'USD' : coin.symbol}`"
							/>
						</label>
					</div>

					<span class="text-xl">
						{{ convertResult }} 
						{{ fromUsd ? coin.symbol : 'USD' }}
					</span>
				</div>
			</div>
			<line-chart
				class="my-10"
				:colors="['orange']"
				:min="min"
				:max="max"
				:data="history"
			/>

			<h3 class="text-xl my-10">Mejores Ofertas de Cambio</h3>
			<table>
				<tr
					v-for="market in markets"
					:key="`${market.exchangeId}-${market.priceUsd}`"
					class="border-b"
				>
					<td>
						<b>{{ market.exchangeId }}</b>
					</td>
					<td>
						{{ dollarFormat(market.priceUsd) }}
					</td>
					<td>{{ market.baseSymbol }} / {{ market.quoteSymbol }}</td>
					<td>
						<PxButton
							v-if="!market.url"
							:isLoading="market.isLoading || false"
							@custom-click="getWebsite(market)"
						>
							Obtener Link
						</PxButton>
						<a
							v-else
							class="hover:underline text-green-600"
							target="_blanck"
						>
							{{ market.url }}
						</a>
					</td>
				</tr>
			</table>
		</template>
	</div>
</template>

<script>
import useCoins from '@/composables/useCoins'
import { useRoute } from 'vue-router'
import { defineAsyncComponent, watch } from 'vue'
export default {
	components: {
		PxButton: defineAsyncComponent(() =>
			import('@/components/PxButton.vue')
		),
	},
	setup() {
		const route = useRoute()
		const {
			getCoin,
			coin,
			dollarFormat,
			percentFormat,
			min,
			max,
			avg,
			isLoading,
			history,
			markets,
			getWebsite,
			toggleConverter,
			convertResult,
			convertValue,
			fromUsd,
		} = useCoins()

		watch(
			() => route.params.id,
			() => {
				getCoin(route.params.id)
			}
		)

		getCoin(route.params.id)

		return {
			coin,
			dollarFormat,
			percentFormat,
			min,
			max,
			avg,
			isLoading,
			history,
			markets,
			getWebsite,
			toggleConverter,
			convertResult,
			convertValue,
			fromUsd,
		}
	},
}
</script>

<style></style>
