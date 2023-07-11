import httpService from "./http.service";

const sizesService = {
    sizesEndPoint: "info/sizes/",

    get: async function() {
        const { data } = await httpService.get(this.sizesEndPoint);
        return data;
    }
};

export default sizesService;
