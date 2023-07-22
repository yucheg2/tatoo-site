import httpService from "./http.service";

const tattoosService = {
    tatoosEndPoint: "info/tatoos/",

    get: async function() {
        const { data } = await httpService.get(this.tatoosEndPoint);
        return data;
    },
    create: async function(payload) {
        const { data } = await httpService.post(this.tatoosEndPoint, payload);
        return data;
    }
};

export default tattoosService;
