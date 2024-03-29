import httpService from "./http.service";
import { localStorageService } from "./localstorage.service";

class SelfMadeService {
    #endPoint = "selfMade/";

    async upload(file) {
        const { data } = await httpService.post(
            this.#endPoint + "upload",
            file,
            { headers: { "content-type": "multipart/form-data" } }
        );

        return data;
    }

    async removeTemporery(userId) {
        const { data } = await httpService.delete(
            this.#endPoint + "temporery/" + userId
        );

        return data;
    }

    async loadToStorage(userId) {
        const { data } = await httpService.post(
            this.#endPoint + "storage/" + userId
        );
        await this.removeTemporery(userId);

        return data;
    }

    async removeFromStore(fileName) {
        const { data } = await httpService.put(
            this.#endPoint + "storage/" + localStorageService.getUserId(),
            { fileName }
        );

        return data;
    }

    async removeStore() {
        const { data } = await httpService.delete(
            this.#endPoint + "storage/" + localStorageService.getUserId()
        );

        return data;
    }

    async loadToOrder(fileName, date) {
        const { data } = await httpService.post(
            this.#endPoint + "order/" + localStorageService.getUserId() + "/" + date,
            { fileName }
        );

        return data;
    }

    async removeOrder(userId, date) {
        const { data } = await httpService.delete(
            this.#endPoint + "order/" + `${userId}/${date}`
        );

        return data;
    }

    async returnToStore(userId, date, fileName) {
        const { data } = await httpService.put(
            this.#endPoint + "order/" + userId + "/" + date,
            { fileName }
        );

        return data;
    }
}

export default new SelfMadeService();
