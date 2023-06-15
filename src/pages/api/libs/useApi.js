import { useState } from "react";

export function useApi(apiFunc) {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState([]);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const request = async (...args) => {
    setLoading(true);
    try {
      const result = await apiFunc(...args);
      setStatus(true);
      setData(result.data.data);
      setMeta(result.data.meta);
    } catch (error) {
      setError(error);
      setStatus(false);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    // Cegah Memory Leak dan Reset State
    setData(null);
    setError(null);
    setLoading(false);
    setStatus(null);
  };

  return { data, error, loading, status, request, reset, meta };
}

export default useApi;