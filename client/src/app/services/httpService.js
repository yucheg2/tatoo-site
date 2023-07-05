import axios from "axios";
import { toast } from "react-toastify";
import configFile from "../config.json";
import { httpAuth } from "../store/users";
import { localStorageService, setTokens } from "./localstorage.service";

axios.defaults.baseURL = configFile.initialEndPoint;

axios.interceptors.request.use(
    async function(config) {
        if (configFile.isFireBase) {
            const containSlash = /\/$/gi.test(config.url);
            config.url = (containSlash
                ? config.url.slice(0, -1)
                : config.url
            ) + ".json";
        }
        const expirecDate = localStorageService.getExpires();
        const refreshToken = localStorageService.getRefreshToken();
        if (refreshToken && Number(expirecDate) < Date.now()) {
            const { data } = await httpAuth.post("token", {
                grant_type: "refresh_token",
                refresh_token: refreshToken
            });
            setTokens({
                refreshToken: data.refresh_token,
                idToken: data.id_token,
                expiresIn: data.expires_in,
                localId: data.user_id
            });
        }
        const accessToken = localStorageService.getAccessTokent();
        if (accessToken) {
            config.params = { ...config.params, auth: accessToken };
        }
        return config;
    }
    ,
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
