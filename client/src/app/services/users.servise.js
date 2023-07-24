import httpService from "./http.service";

const usersEndPoint = "users/";

const userServuse = {
    create: async(payload) => {
        const { data } = await httpService.put(usersEndPoint + payload._id, payload);
        return data;
    },
    getById: async(id) => {
        const { data } = await httpService.get(usersEndPoint + id);
        return data;
    },
    edit: async(payload) => {
        const { data } = await httpService.put(usersEndPoint + payload._id, payload);
        return data;
    },
    takeOrder: async(id, orderData) => {
        const endPoint = usersEndPoint + `${id}/order/${orderData.date}`;

        const { data } = await httpService.post(endPoint, orderData);
        return data;
    },
    clearOrder: async(id, date) => {
        const endPoint = usersEndPoint + `${id}/order/${date}`;

        const data = await httpService.delete(endPoint);
        return data;
    },
    compleatOrder: async(id, date) => {
        const endPoint = usersEndPoint + `${id}/order/${date}`;

        const { data } = await httpService.put(endPoint, { compleat: true });
        return data;
    }
};

export default userServuse;
