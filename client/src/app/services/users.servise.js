import httpService from "./httpService";

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

        const existResponse = await httpService.get(endPoint);
        if (existResponse.data) {
            return "Вы уже записаны на этот день.";
        }
        const data = await httpService.put(endPoint, orderData);
        return data;
    },
    clearOrder: async function(id, date) {
        const endPoint = usersEndPoint + `${id}/order/${date}`;

        const existResponse = await httpService.get(endPoint);

        if (existResponse.data) {
            const data = await httpService.delete(endPoint);
            return data;
        }
    }
};

export default userServuse;
