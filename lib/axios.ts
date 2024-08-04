import Axios from 'axios'

const axios = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        Accept: 'application/json',
    }
})

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;

export default axios;
