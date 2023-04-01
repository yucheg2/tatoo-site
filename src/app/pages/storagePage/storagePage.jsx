import React, { useEffect, useState } from "react";
import StorageList from "../../components/ui/storageList/storageList";
import { useTatoos } from "../../hooks/useTatoo";

const StoragePage = () => {
    const [items, setItems] = useState([]);
    const { getTatoosBySrc } = useTatoos();
    const storage = JSON.parse(localStorage.getItem("store"));

    useEffect(() => {
        const addTatoos = storage && storage.map((t) => {
            const item = { ...getTatoosBySrc(t._id) };
            item.id = t._id + t.places;
            item.place = t.places;
            return item;
        });
        setItems(addTatoos);
    }, []);
    const handleDelete = (id) => {
        const filtred = items.filter((t) => t.id !== id);
        setItems(filtred);
        localStorage.setItem("store", JSON.stringify(filtred));
    };
    return (
        <div className='container-lg'>
            {(items.length > 0)
                ? <StorageList arr={items} handleDelete={handleDelete}/>
                : <h1 className="text-center color-fg-muted">У вас нет заказов</h1>
            }
        </div>
    );
};

export default StoragePage;
