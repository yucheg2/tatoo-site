import httpService from "./http.service";

class StylesService {
    #stylesEndPoint = "info/styles/";

    async get() {
        const { data } = await httpService.get(this.#stylesEndPoint);
        return data;
    }
};

export default new StylesService();
