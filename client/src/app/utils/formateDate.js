const formateDate = (date) => {
    const day = date.slice(-2);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);

    return ({ str: `${day}.${month}.${year}` });
};

export default formateDate;
