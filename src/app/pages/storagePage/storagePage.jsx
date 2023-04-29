import React, { useEffect, useRef, useState } from "react";
import StorageList from "../../components/ui/storageList/storageList";
import { useAuth } from "../../hooks/useAuth";
import { useNavCount } from "../../hooks/useNavCount";
import { useTatoos } from "../../hooks/useTatoo";
import { localStorageService } from "../../services/localstorage.service";

const StoragePage = () => {
    const { currentUser } = useAuth();
    const orderCount = useRef((currentUser && currentUser.order) ? Object.values(currentUser.order).length : 0);

    const [items, setItems] = useState([]);
    const { getTatoosBySrc } = useTatoos();
    const { handleDicr } = useNavCount();
    const { clearCount } = useNavCount();
    const storage = localStorage.getItem("store");

    useEffect(() => {
        const addTatoos = storage && JSON.parse(storage).map((t) => {
            const item = { ...getTatoosBySrc(t.src) };
            item._id = t._id;
            item.place = t.place;
            return item;
        });
        setItems(addTatoos);
    }, []);
    const handleDelete = (id) => {
        const filtred = items.filter((t) => t._id !== id);
        setItems(filtred);
        handleDicr();
        localStorage.setItem("store", JSON.stringify(filtred));
    };

    useEffect(() => {
        const cuerrentLenght = currentUser && currentUser.order
            ? Object.values(currentUser.order).length
            : 0;
        if (!localStorageService.getUserId()) {
            localStorage.removeItem("store");
            setItems([]);
        }
        if (cuerrentLenght > orderCount.current) {
            localStorage.removeItem("store");
            setItems([]);
            clearCount();
            orderCount.current = cuerrentLenght;
        }
    }, [currentUser]);
    return (
        <div className='container-lg'>
            {(items && items.length > 0)
                ? <StorageList arr={items} handleDelete={handleDelete}/>
                : <h1 className="text-center color-fg-muted">У вас нет заказов</h1>
            }
        </div>
    );
};

export default StoragePage;
