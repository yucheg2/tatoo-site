import React from "react";
import { useSelector } from "react-redux";
import MastersList from "../../components/ui/mastersList/mastersList";
import { getMastersListSelectors } from "../../store/masters";

const MastersPage = () => {
    const masters = useSelector(getMastersListSelectors());
    return (
        <div className='container-lg'>
            <h1 className="h1-mktg mb-4 text-center">Мастера татуировки</h1>
            {masters ? <MastersList obj={masters}/> : "Загрузка..."}
        </div>
    );
};

export default MastersPage;
