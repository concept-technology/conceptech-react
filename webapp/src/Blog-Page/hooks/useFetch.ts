import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "../../authentication/ApiClint";
import { useAuth } from "../../authentication/AuthContext";

const useFetch = <T>(endpoint: string, token?: string) => {
  const [data, setData] = useState<T[]>([]); // State is an array of type T
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const [status, setStatus] = useState(false);
  useEffect(() => {

    const controller = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await apiClient.get<T[]>(endpoint, {
          signal: controller.signal,
          headers: token ? { Authorization: `Bearer ${token}` } : {}, // Conditionally add the Authorization header
        });
        setData(response.data);
        console.log(response.data)
        if (response.status === 200) {
          setStatus(true);
        }
        console.log(response.data);
        setLoading(false);
      } catch (err: any) {
        if (err instanceof CanceledError) return; // Handle cancelation error
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup the abort controller on unmount
  }, [endpoint, token]);

  return { data, loading, error, setData, status }; // Expose `setData` for manual updates
};

export default useFetch;
