import numeral from 'numeral';
import { computed, ref } from "vue";
import { getCoins, getCoin, getCoinHistory, getMarkets, getExchange } from "@/api/coincap";

const useCoins = () => {
    const coins = ref([]);
    const coin = ref({});
    const coinHistory = ref([]);
    const markets = ref([]);
    const isLoading = ref(false);
    const fromUsd = ref(true);
    const convertValue = ref(null);
    return {
        dollarFormat: value => !value ? '$ 0' : numeral(value).format('$ 0.00a'),
        percentFormat: value => !value ? '0%' : `${Number(value).toFixed(2)}%`,
        textColor: value => value.includes('-') ? 'text-red-600' : 'text-green-600',
        getAllCoins: async () => {
            isLoading.value = true;
            const { data } = await getCoins();
            if (data) coins.value = data;
            isLoading.value = false;
        },
        getCoin: async (id) => {
            isLoading.value = true;

            const respCoin = await getCoin(id);
            const respHistory = await getCoinHistory(id);
            const respMarkets = await getMarkets(id);

            if (respCoin) coin.value = respCoin.data;
            if (respHistory) coinHistory.value = respHistory.data;
            if (respMarkets) markets.value = respMarkets.data;

            isLoading.value = false;
        },
        getWebsite: async (exchange) => {
            // console.log(exchange);
            exchange.isLoading = true;
            const respExchange = await getExchange(exchange.exchangeId);
            exchange.url = respExchange.echangeUrl ? respExchange.echangeUrl : 'https://www.google.com/';
            exchange.isLoading = false;
        },
        toggleConverter: () => {
            fromUsd.value = !fromUsd.value;
        },
        min: computed(() => {
            const min = Math.min(...coinHistory.value.map(({ priceUsd }) => parseFloat(priceUsd).toFixed(2)));
            return min;
        }),
        max: computed(() => {
            const max = Math.max(...coinHistory.value.map(({ priceUsd }) => parseFloat(priceUsd).toFixed(2)));
            return max;
        }),
        avg: computed(() => {
            return (coinHistory.value.reduce((a, b) => a + parseFloat(b.priceUsd), 0) / coinHistory.value.length).toFixed(2);
        }),
        history: computed(() => {
            return coinHistory.value.map(h => [h.date, parseFloat(h.priceUsd).toFixed(2)]);
        }),
        convertResult: computed(() => {
            console.log(convertValue.value);
            if (!convertValue.value) return 0;
            const result = fromUsd.value ? convertValue.value / coin.value.priceUsd : convertValue.value * coin.value.priceUsd;
            return result.toFixed(2);
        }),
        coins,
        coin,
        markets,
        isLoading,
        convertValue,
        fromUsd
    };
};

export default useCoins;