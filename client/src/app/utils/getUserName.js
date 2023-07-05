import { toast } from "react-toastify";
import userServuse from "../services/users.servise";

const getNameById = async(id) => {
    try {
        const data = await userServuse.getById(id);
        return data.name;
    } catch (error) {
        toast.error(error.message);
    }
};

export default getNameById;
