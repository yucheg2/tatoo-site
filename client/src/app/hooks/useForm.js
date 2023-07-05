import { useState } from "react";

const useForm = (initial = {}) => {
    const [data, setData] = useState(initial);
    const handleChange = (target) => {
        setData((p) => ({
            ...p,
            ...target
        }));
    };
    const setInitial = () => {
        setData(initial);
    };
    return ({ data, handleChange, setInitial });
};

export default useForm;
