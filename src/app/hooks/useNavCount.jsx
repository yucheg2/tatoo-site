import { useState } from "react";

const useNavCount = () => {
    const store = localStorage.getItem("store");
    const [currentCount, setCount] = useState(store);
    function handleInc() {
        setCount(p => p + 1);
    }
    function handleDicr() {
        setCount(p => p - 1);
    }
    return { currentCount, handleDicr, handleInc };
};

export default useNavCount;
