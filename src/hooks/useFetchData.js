import { useState, useEffect } from "react";
import axios from "axios";

function useFetchData(endpoint) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        // fetch(`https://jsonplaceholder.typicode.com/${endpoint}`)
        //     .then((res) => res.json())
        //     .then((json) => {
        //         setData(json);
        //         setLoading(false);
        //     })
        //     .catch((err) => {
        //         setError(err.message);
        //         setLoading(false);
        //     });
    
    //axios ile fetch işlemi
        axios.get(`https://jsonplaceholder.typicode.com/${endpoint}`)
        .then((res) => {
            setData(res.data);
            setLoading(false);
        })
        .catch((err) => {
            setError(err.message);
            setLoading(false);
        });


    }, [endpoint]);

    return { data, loading, error };
}

export default useFetchData;
