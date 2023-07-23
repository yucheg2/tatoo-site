import httpService from "./http.service";

const commentsService = {
    get: async function(masterId) {
        const { data } = await httpService.get(`masters/${masterId}/comments`);
        return data;
    },
    add: async function(masterId, payload) {
        const { data } = await httpService.post(`masters/${masterId}/comments`, payload);
        return data;
    },
    remove: async function(masterId, commentId) {
        const { data } = await httpService.delete(`masters/${masterId}/comments/${commentId}`);
        return data;
    }
};

export default commentsService;
