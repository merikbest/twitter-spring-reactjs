import axios from "axios";
import { TOKEN } from "../constants/common-constants";

axios.interceptors.request.use((config) => {
    if (localStorage.getItem(TOKEN)) {
        config.headers["Authorization"] = localStorage.getItem(TOKEN);
        return config;
    } else {
        return config;
    }
});

export { axios };
