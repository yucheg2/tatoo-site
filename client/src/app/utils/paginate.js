const paginate = (pageNumber, pageSize, data) => {
    const startIndex = (pageNumber - 1) * pageSize;
    const takedItems = data.slice(startIndex, (pageNumber * pageSize));
    if (takedItems.length === 0) {
        return data.slice(startIndex);
    }
    return takedItems;
};

export default paginate;
