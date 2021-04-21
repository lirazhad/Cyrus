import axios, { AxiosResponse } from 'axios';

const BASE_URL = 'https://api.stackexchange.com/';

const instance = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 20000
});

export const getQuestions = (id: string) => new Promise<AxiosResponse>(async (resolve, reject) => {
    try {
        const response = await instance.get(`users/${id}/questions?order=desc&sort=activity&site=stackoverflow`);
        return resolve(response.data.items);
    } catch (error) {
        reject(error)
    }
});

