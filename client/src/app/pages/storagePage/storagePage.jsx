import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StorageList from "../../components/ui/storageList/storageList";
import { localStorageService } from "../../services/localstorage.service";
import { clearNavCount, dicrementNavCount } from "../../store/count";
import { getTatooInStorageSelector } from "../../store/tatoo";
import { getCurrentUserSelector } from "../../store/users";

const StoragePage = () => {
    const dispatch = useDispatch();

    const currentUser = useSelector(getCurrentUserSelector());
    const orderCount = useRef((currentUser?.order) ? Object.values(currentUser.order).length : 0);

    const addedTatoos = useSelector(getTatooInStorageSelector());

    const [items, setItems] = useState(addedTatoos);

    const handleDelete = (id) => {
        const filtred = items.filter((t) => t._id !== id);
        setItems(filtred);
        dispatch(dicrementNavCount());
        localStorage.setItem("store", JSON.stringify(filtred));
    };

    useEffect(() => {
        const cuerrentLenght = currentUser?.order
            ? Object.values(currentUser.order).length
            : 0;
        if (!localStorageService.getUserId()) {
            localStorage.removeItem("store");
            setItems([]);
        }
        if (cuerrentLenght > orderCount.current) {
            localStorage.removeItem("store");
            setItems([]);
            dispatch(clearNavCount());
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
