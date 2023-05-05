const formateDate = (date) => {
    const day = date.slice(-2);
    const month = date.slice(5, 7);
    const year = date.slice(0, 4);

    const isCompleat = new Date(Number(year), Number(month) - 1, Number(day)) < Date.now();

    return ({ str: `${day}.${month}.${year}`, isCompleat });
};

export default formateDate;
