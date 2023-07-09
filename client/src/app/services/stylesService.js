import httpService from "./httpService";

const stylesService = {
    stylesEndPoint: "info/styles/",

    get: async function() {
        const data = await httpService.get(this.stylesEndPoint);
        return data;
    }
};

export default stylesService;