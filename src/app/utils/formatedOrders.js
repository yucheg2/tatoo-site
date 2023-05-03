import { useMasters } from "../hooks/useMasters";
import formateDate from "./formateDate";

const formateOrders = (orders) => {
    const { getMasterById } = useMasters();
    const ordersObj = {};
    orders && Object.values(orders).forEach((ord) => {
        const master = getMasterById(ord.person);
        ordersObj[formateDate(ord.date)] = {
            orders: JSON.parse(ord.order),
            master: master && { name: master.name, rate: master.rate }
        };
    });
    return ordersObj;
};

export default formateOrders;
