import React from "react";
import MastersList from "../../components/ui/mastersList/mastersList";
import CommentsProvider from "../../hooks/useComments";
import { useMasters } from "../../hooks/useMasters";

const MastersPage = () => {
    const { masters } = useMasters();
    return (
        <CommentsProvider>
            <div className='container-lg'>
                <h1 className="h1-mktg mb-4 text-center">Мастера татуировки</h1>
                {masters ? <MastersList obj={masters}/> : "Загрузка..."}
            </div>
        </CommentsProvider>);
};

export default MastersPage;
