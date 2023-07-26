import httpService from "./http.service";
import { localStorageService } from "./localstorage.service";

class MastersService {
    #mastersEndPoint = "masters/";

    async get() {
        const { data } = await httpService.get(this.#mastersEndPoint);
        return data;
    }

    async getById(masterId) {
        const { data } = await httpService.get(this.#mastersEndPoint + masterId);
        return data;
    }

    async updateRate(masterId, newRate) {
        const { data } = await httpService.put(this.#mastersEndPoint + `${masterId}/rate`, newRate);
        return data;
    }

    async takeOrder(masterId, orderData) {
        const endPoint = this.#mastersEndPoint + `${masterId}/order/${orderData.date}`;

        const { data } = await httpService.put(endPoint, orderData);
        return data;
    }

    async clearOrder(masterId, date) {
        const endPoint = this.#mastersEndPoint + `${masterId}/order/${date}`;

        const { data } = await httpService.delete(endPoint);
        return data;
    }

    async edit(payload) {
        const endPoint = this.#mastersEndPoint + localStorageService.getUserId();
        const { data } = await httpService.put(endPoint, payload);
        return data;
    }
};

export default new MastersService();
