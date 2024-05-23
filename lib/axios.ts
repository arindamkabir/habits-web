import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        Accept: 'application/json'
    }
})

axios.interceptors.request.use(function (config) {
    const access_token = localStorage.getItem('access_token');
    config.headers.Authorization = access_token ? `Bearer ${access_token}` : '';

    return config;
});


export default axios;
