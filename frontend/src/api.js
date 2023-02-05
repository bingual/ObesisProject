import Axios from 'axios';
import { makeUseAxios } from 'axios-hooks';
import { API_HOST } from 'Constants';

// 커스텀 Axios
export const axiosInstance = Axios.create({
    baseURL: API_HOST,
});

// 커스텀 useAxios
export const useAxios = makeUseAxios({
    axios: axiosInstance,
});
