import { useState, useEffect } from "react";

const useHealthData = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("healthData")) || [];
        setData(saved);
    }, []);

    return data;
};

export default useHealthData;