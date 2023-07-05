const getTatooPrice = ({ size, price }) => {
    if (!price) {
        switch (size.name) {
        case "Большая":
            return 16000;
        case "Средняя":
            return 8000;
        default:
            return 4000;
        }
    }
    return price;
};

export default getTatooPrice;
