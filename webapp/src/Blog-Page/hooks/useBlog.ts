import { useEffect, useState } from "react";

import { CanceledError } from "axios";
import apiClient from "../../authentication/ApiClint";


 interface Blog{
  title: string;
  slug: string;
  author: string;
  content: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  id: number;
  description:string
}

const useBlog = (url:string) => {
  const [data, setData] = useState<Blog[]>([]); // State is an array of Blog objects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const controller = new AbortController()
    setLoading(true)
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get<Blog[]>(url,{signal:controller.signal}); // Ensure the response matches the type
        setLoading(false)
        setData(response.data);
        console.log(response.data)
      } catch (err: any) {
        if (err instanceof CanceledError) return;
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    ()=> controller.abort()
    fetchBlogs();
  }, []);

  return { data, loading, error , setData};
};

export default useBlog;
