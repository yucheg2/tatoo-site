import { useMasters } from "../hooks/useMasters";
import formateDate from "./formateDate";

const formateOrders = (orders) => {
    const { getMasterById } = useMasters();
    const ordersObj = {};
    orders && Object.values(orders).forEach((ord) => {
        const master = getMasterById(ord.person);
        const formated = formateDate(ord.date);
        ordersObj[formated.str] = {
            date: ord.date,
            compleat: formated.isCompleat,
            orders: JSON.parse(ord.order),
            master: master && { name: master.name, rate: master.rate, id: master._id }
        };
    });
    return ordersObj;
};

export default formateOrders;
