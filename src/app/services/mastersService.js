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
    },
    takeOrder: async function(masterId, orderData) {
        const endPoint = this.mastersEndPoint + `${masterId}/order/${orderData.date}`;

        const existResponse = await httpService.get(endPoint);
        if (existResponse.data) {
            return "Мастер в этот день зянят.";
        }
        const data = await httpService.put(endPoint, orderData);
        return data;
    },
    clearOrder: async function(masterId, date) {
        const endPoint = this.mastersEndPoint + `${masterId}/order/${date}`;

        const existResponse = await httpService.get(endPoint);

        if (existResponse.data) {
            const data = await httpService.delete(endPoint);
            return data;
        }
    }
};

export default mastersService;
