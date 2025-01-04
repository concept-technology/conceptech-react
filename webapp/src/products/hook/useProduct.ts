import { useEffect, useState } from "react";
import apiClient from "../../authentication/ApiClint";
import { CanceledError } from "axios";

interface Product {
  id: number;
  name: string;
  description: string;
  base_price: number;
  discount_price?: number;
  is_active: boolean;
  features?: string[];
}

const useProduct = (url: string) => {
  const [products, setProducts] = useState<Product[]>([]); // State is an array of Product objects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);

    const fetchProducts = async () => {
      try {
        const response = await apiClient.get<Product[]>(url, {
          signal: controller.signal,
        });
        setProducts(response.data);
        console.log(response.data);
      } catch (err: any) {
        if (err instanceof CanceledError) return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    // Cleanup function to abort ongoing requests
    return () => controller.abort();
  }, [url]);

  return { products, loading, error };
};

export default useProduct;
