import { useEffect, useState } from "react";
import apiClient from "../authentication/ApiClint";

export interface Blog {
  title: string;
  slug: string;
  author: string;
  content: string;
  image: string;
  created_at: Date;
  updated_at: Date;
  id: number;
}

const useBlog = () => {
  const [data, setData] = useState<Blog[]>([]); // State is an array of Blog objects
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await apiClient.get<Blog[]>("/api/blog/"); // Ensure the response matches the type
        setData(response.data);
      } catch (err: any) {
        setError(err.message || "An error occurred while fetching blogs.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  return { data, loading, error };
};

export default useBlog;
