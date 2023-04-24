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
    }
};

export default userServuse;
