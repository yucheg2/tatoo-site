import httpService from "./httpService";

const tattoosService = {
    tatoosEndPoint: "tatoos/",

    get: async function() {
        const data = await httpService.get(this.tatoosEndPoint);
        return data;
    }
};

export default tattoosService;
