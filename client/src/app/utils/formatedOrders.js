import formateDate from "./formateDate";

const formateOrders = (orders, masters) => {
    const ordersObj = {};
    orders && Object.values(orders).forEach((ord) => {
        const { person } = ord;
        const master = masters && masters.find(m => m._id === person);
        const formated = formateDate(ord.date);
        ordersObj[formated.str] = {
            date: ord.date,
            compleat: ord.compleat,
            orders: JSON.parse(ord.order),
            user: typeof person === "object" ? person : undefined,
            master: master && { name: master.name, rate: master.rate, id: master._id }
        };
    });
    return ordersObj;
};

export default formateOrders;
