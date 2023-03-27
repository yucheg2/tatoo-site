import React from "react";
import { useTatoos } from "../../hooks/useTatoo";
import MainPageLayout from "../../layouts/mainPageLayout";

const StoragePage = () => {
    const { getTatoosBySrc } = useTatoos();
    const storage = JSON.parse(localStorage.getItem("store"));
    const addTatoos = storage && storage.map((t) => getTatoosBySrc(t._id));
    console.log(addTatoos);
    return (
        <MainPageLayout>
            <div className='container-lg'>
                {storage
                    ? <div>
                        {storage.map((tatoo) => {
                            return <h3 key={tatoo._id}>{tatoo._id}</h3>;
                        })}
                    </div>
                    : <h3>У вас нет заказов</h3>
                }
            </div>
        </MainPageLayout>
    );
};

export default StoragePage;
