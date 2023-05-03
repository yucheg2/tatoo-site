import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../../common/carousel/carousel";

const OrderBlock = ({ master, orders }) => {
    const [page, setPage] = useState(1);
    const pagesCount = orders.length - 1;

    const handleInc = () => {
        setPage(p => p + 1);
    };
    const handleDic = () => {
        setPage(p => p - 1);
    };

    useEffect(() => {
        setPage(1);
    }, [orders]);
    return orders && master && (<div className="flex-auto border rounded-3 p-3">
        <div className="d-flex mb-2">
            <h2 className="mr-1">{`Мастер: ${master.name} `}</h2>
            <p>{`(${master.rate}/5)`}</p>
        </div>
        <div >
            <h2 className="border-bottom mb-2">Заказ</h2>
            <Carousel
                pageNumber={page}
                pagesCount={pagesCount}
                onPageDicrement={handleDic}
                onPageIncrement={handleInc}
            >
                {orders.map((order, i) => {
                    return (
                        <img
                            id={i}
                            key={order._id}
                            src={order.src}
                            alt="order"
                            className="celendarTatooImg"
                            style={{
                                minWidth: "300px"
                            }}
                        />
                    );
                })}
            </Carousel>

        </div>
    </div>);
};

export default OrderBlock;

OrderBlock.propTypes = {
    orders: PropTypes.array,
    master: PropTypes.object
};
