import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../helpers/axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axios.get(url, { signal });
        if (res.status === 200) {
          setData(res.data); // Use res.data to access the actual data
        }
      } catch (e) {
        if (e.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setError(e);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup function
    return () => {
      abortController.abort();
    };
  }, [url, navigate]); // Added navigate to dependencies in case it's used

  return { data, loading, error };
};

export default useFetch;
