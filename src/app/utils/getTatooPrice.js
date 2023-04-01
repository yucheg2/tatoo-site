const getTatooPrice = ({ size, price }) => {
    if (!price) {
        switch (size.name) {
        case "Большая":
            return "16000 руб.";
        case "Средняя":
            return "8000 руб.";
        default:
            return "4000 руб";
        }
    }
    return price;
};

export default getTatooPrice;
