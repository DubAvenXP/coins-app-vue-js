import numeral from 'numeral';
import { computed, ref } from "vue";
import { getCoins, getCoin, getCoinHistory } from "@/api/coincap";

const useCoins = () => {
    const coins = ref([]);
    const coin = ref({});
    const coinHistory = ref([]);
    return {
        dollarFormat: value => !value ? '$ 0' : numeral(value).format('$ 0.00a'),
        percentFormat: value => !value ? '0%' : `${Number(value).toFixed(2)}%`,
        textColor: value => value.includes('-') ? 'text-red-600' : 'text-green-600',
        getAllCoins: async () => {
            const { data } = await getCoins();
            if (data) coins.value = data;
        },
        getCoin: async (id) => {
            const respCoin = await getCoin(id);
            const respHistory = await getCoinHistory(id);
            if (respCoin) coin.value = respCoin.data;
            if (respHistory) coinHistory.value = respHistory.data;
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
            const abs = Math.abs(...coinHistory.value.map(({ priceUsd }) => parseFloat(priceUsd).toFixed(2)));
            return abs;
        }),
        coins,
        coin,
    };
};

export default useCoins;