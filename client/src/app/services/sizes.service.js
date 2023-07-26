import httpService from "./http.service";

class SizesService {
    #sizesEndPoint = "info/sizes/";

    async get() {
        const { data } = await httpService.get(this.#sizesEndPoint);
        return data;
    }
};

export default new SizesService();
