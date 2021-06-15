import axios from 'axios';

axios.interceptors.request.use((config) => {
    if (localStorage.getItem('token')) {
        config.headers['Authorization'] = localStorage.getItem('token');
        return config;
    } else {
        return config;
    }
});

export { axios };
