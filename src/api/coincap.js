/* eslint-disable no-unused-vars */
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
        // const data = await fetch(`${baseUrl}/assets?limit=20`);
        // return data.json();
    } catch (error) {
        console.log(error.response);
        return [];

    }
};

const getCoin = async (id) => {
    const { data } = await coincapApi.get(`/assets/${id}`);
    return data;
    // const data = await fetch(`${baseUrl}/assets/${id}`);
    // return data.json();
};

const getCoinHistory = async (id) => {
    const now = new Date();
    const end = now.getTime();
    now.setDate(now.getDate() - 1);
    const start = now.getTime();

    const { data } = await coincapApi.get(`/assets/${id}/history?interval=h1&start=${start}&end=${end}`);
    return data;
    // const data = await fetch(`${baseUrl}/assets/${id}/history?interval=h1&start=${start}&end=${end}`);
    // return data.json();
};

const getMarkets = async coin => {
    const { data } = await coincapApi.get(`/assets/${coin}/markets?limit=5`);
    return data;
};
const getExchange = async id => {
    const { data } = await coincapApi.get(`/exchanges/${id}`);
    return data;
};




export { getCoins, getCoin, getCoinHistory, getMarkets, getExchange };