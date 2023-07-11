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

        const { data } = await httpService.put(endPoint, orderData);
        return data;
    },
    clearOrder: async function(id, date) {
        const endPoint = usersEndPoint + `${id}/order/${date}`;

        const data = await httpService.delete(endPoint);
        return data;
    }
};

export default userServuse;
