import httpService from "./http.service";

class UserServuse {
    #usersEndPoint = "users/";

    async create(payload) {
        const { data } = await httpService.put(this.#usersEndPoint + payload._id, payload);
        return data;
    }

    async getById(id) {
        const { data } = await httpService.get(this.#usersEndPoint + id);
        return data;
    }

    async edit(payload) {
        const { data } = await httpService.put(this.#usersEndPoint + payload._id, payload);
        return data;
    }

    async takeOrder(id, orderData) {
        const endPoint = this.#usersEndPoint + `${id}/order/${orderData.date}`;

        const { data } = await httpService.post(endPoint, orderData);
        return data;
    }

    async clearOrder(id, date) {
        const endPoint = this.#usersEndPoint + `${id}/order/${date}`;

        const { data } = await httpService.delete(endPoint);
        return data;
    }

    async compleatOrder(id, date) {
        const endPoint = this.#usersEndPoint + `${id}/order/${date}`;

        const { data } = await httpService.put(endPoint, { compleat: true });
        return data;
    }
};

export default new UserServuse();
