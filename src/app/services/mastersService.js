import httpService from "./httpService";

const mastersService = {
    mastersEndPoint: "masters/",

    get: async function() {
        const data = await httpService.get(this.mastersEndPoint);
        return data;
    }
};

export default mastersService;
