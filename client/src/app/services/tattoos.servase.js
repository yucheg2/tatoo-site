import httpService from "./http.service";

class TattoosService {
    #tatoosEndPoint = "info/tatoos/";

    async get() {
        const { data } = await httpService.get(this.#tatoosEndPoint);
        return data;
    }

    async create(payload) {
        const { data } = await httpService.post(this.#tatoosEndPoint, payload);
        return data;
    }

    async remove(tatooId, style, fileName) {
        const { data } = await httpService.delete(this.#tatoosEndPoint + `${tatooId}/${style}/${fileName}`);
        return data;
    }
};

export default new TattoosService();
