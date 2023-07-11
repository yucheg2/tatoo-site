import httpService from "./http.service";

const stylesService = {
    stylesEndPoint: "info/styles/",

    get: async function() {
        const { data } = await httpService.get(this.stylesEndPoint);
        return data;
    }
};

export default stylesService;
