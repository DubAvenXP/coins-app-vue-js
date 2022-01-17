import numeral from 'numeral';
import { ref } from "vue";
import { getCoins } from "@/api/coincap";

const useCoins = () => {
    const coins = ref([]);

    const getAllCoins = async () => {
        const { data } = await getCoins();
        if (data) coins.value = data;
    };

    getAllCoins();

    return {
        dollarFormat: value => !value ? '$ 0' : numeral(value).format('$ 0.00a'),
        percentFormat: value => !value ? '0%' : `${ Number(value).toFixed(2)}%`,
        textColor: value => value.includes('-') ? 'text-red-600' : 'text-green-600',
        coins,
    };
};

export default useCoins;