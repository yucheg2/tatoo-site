import httpService from "./http.service";

class CommentsService {
    async get(masterId) {
        const { data } = await httpService.get(`masters/${masterId}/comments`);
        return data;
    }

    async add(masterId, payload) {
        const { data } = await httpService.post(`masters/${masterId}/comments`, payload);
        return data;
    }

    async remove(masterId, commentId) {
        const { data } = await httpService.delete(`masters/${masterId}/comments/${commentId}`);
        return data;
    }
};

export default new CommentsService();
