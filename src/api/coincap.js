import axios from "axios";

const baseUrl = "https://api.coincap.io/v2";

const coincapApi = axios.create({
    baseURL: baseUrl,
});

const getCoins = async () => {
    try {
        const { data } = await coincapApi.get("/assets", {
            params: {
                limit: 20,
            },
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }
        });
        return data;
    } catch (error) {
        console.log(error.response);
        return [];

    }
};

const getCoin = async (id) => {
    const { data } = await coincapApi.get(`/assets/${id}`);
    return data;
};

export { getCoins, getCoin };