import axios from "axios"

export const configAxiosUse = () => {
    axios.defaults.baseURL = 'http://localhost:8000/api';
    axios.defaults.timeout = 30000;
    axios.interceptors.request.use(
        (config) => {
            const auth: any = localStorage.getItem('user');
            const user = JSON.parse(auth);
            if (user) {
                config.headers.Authorization = `Bearer ${user.access_token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    )
}