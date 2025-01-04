import { useEffect, useState } from "react";
import { CanceledError } from "axios";
import apiClient from "../../authentication/ApiClint";

const useFetch = <T>(endpont: string) => {
  const [data, setData] = useState<T[]>([]); // State is an array of type T
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchData = async () => {
      try {
        const response = await apiClient.get<T[]>(endpont, { signal: controller.signal }); // Ensure the response matches type T
        setData(response.data);
        console.log(response.data)
        setLoading(false);
      } catch (err: any) {
        if (err instanceof CanceledError) return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => controller.abort(); // Cleanup the abort controller on unmount
  }, [endpont]);

  return { data, loading, error, setData }; // Expose `setData` for manual updates
};

export default useFetch;
