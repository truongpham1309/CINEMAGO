import axios from "axios"

export const configAxiosUse = () => {
    axios.defaults.baseURL = 'http://localhost:8000/api';
    axios.defaults.timeout = 10000;
    axios.interceptors.request.use(
        (config) => {
            const auth: any = sessionStorage.getItem('auth');
            if(auth){
                config.headers.Authorization = `Bearer ${auth.access_token}`;
            }

            return config;
        },
        (error) => Promise.reject(error)
    )
}