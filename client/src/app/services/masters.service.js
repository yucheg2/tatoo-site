import httpService from "./http.service";
import { localStorageService } from "./localstorage.service";

const mastersService = {
    mastersEndPoint: "masters/",

    get: async function() {
        const { data } = await httpService.get(this.mastersEndPoint);
        return data;
    },
    getById: async function(masterId) {
        const { data } = await httpService.get(this.mastersEndPoint + masterId);
        return data;
    },
    updateRate: async function(masterId, newRate) {
        const { data } = await httpService.put(this.mastersEndPoint + `${masterId}/rate`, newRate);
        return data;
    },
    takeOrder: async function(masterId, orderData) {
        const endPoint = this.mastersEndPoint + `${masterId}/order/${orderData.date}`;

        const { data } = await httpService.put(endPoint, orderData);
        return data;
    },
    clearOrder: async function(masterId, date) {
        const endPoint = this.mastersEndPoint + `${masterId}/order/${date}`;

        const { data } = await httpService.delete(endPoint);
        return data;
    },
    edit: async function(payload) {
        const endPoint = this.mastersEndPoint + localStorageService.getUserId();
        const { data } = await httpService.put(endPoint, payload);
        return data;
    }
};

export default mastersService;
