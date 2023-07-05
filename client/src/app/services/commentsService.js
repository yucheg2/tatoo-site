import httpService from "./httpService";

const commentsService = {
    get: async function(masterId) {
        const data = await httpService.get(`masters/${masterId}/comments`);
        return data;
    },
    add: async function(masterId, payload) {
        const data = await httpService.post(`masters/${masterId}/comments`, payload);
        return data;
    }
};

export default commentsService;
