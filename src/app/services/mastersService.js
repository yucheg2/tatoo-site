import httpService from "./httpService";

const mastersService = {
    mastersEndPoint: "masters/",

    get: async function() {
        const data = await httpService.get(this.mastersEndPoint);
        return data;
    },
    updateRate: async function(masterId, newRate) {
        const data = await httpService.put(this.mastersEndPoint + `${masterId}/rate`, newRate);
        return data;
    }
};

export default mastersService;
