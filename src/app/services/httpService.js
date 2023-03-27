import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";

axios.defaults.baseURL = configFile.initialEndPoint;

axios.interceptors.request.use(
    function(config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash
                ? config.url.slice(0, -1)
                : config.url
            ) + ".json";
        }
        return config;
    },
    function(error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (res) => res,
    (error) => {
        const expextedError = error.response && error.response.status >= 400 && error.response.status < 500;
        if (!expextedError) {
            toast.error("Unexepted error");
        }
        return Promise.reject(error);
    }
);

const httpService = {
    get: axios.get,
    put: axios.put,
    post: axios.post,
    delete: axios.delete
};

export default httpService;
