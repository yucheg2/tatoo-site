import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Carousel from "../../common/carousel/carousel";
import PaginationNP from "../../common/paginationNP";

const OrderBlock = ({ date, master, orders, onOrder, compleat, onCancel }) => {
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
    return orders && master && (<>
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
                        <div key={order._id} className="celendarTatooImg">
                            <img
                                title="Подробнее"
                                onClick={() => { onOrder(order); }}
                                id={i}
                                src={"/" + order.src}
                                alt="order"
                                style={{
                                    minWidth: "300px"
                                }}
                            />
                        </div>
                    );
                })}
            </Carousel>
            {pagesCount > 1 && <PaginationNP
                pageNumber={page}
                pagesCount={pagesCount}
                onPageDicrement={handleDic}
                onPageIncrement={handleInc}/>}
            <div className="d-flex flex-justify-end pt-3">
                {compleat
                    ? <button className="btn btn-primary ">Оставить отзыв</button>
                    : (<button
                        className="btn btn-danger"
                        onClick={() => { onCancel({ master: master.id, date }); }}
                    >
                        Отменить заказ
                    </button>)
                }
            </div>
        </div>
    </>);
};

export default OrderBlock;

OrderBlock.propTypes = {
    date: PropTypes.string,
    onCancel: PropTypes.func,
    compleat: PropTypes.bool,
    onOrder: PropTypes.func,
    orders: PropTypes.array,
    master: PropTypes.object
};
