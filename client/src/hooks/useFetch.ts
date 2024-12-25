import protectedAPI from "@/lib/axios/auth";
import { useState, useEffect } from "react";

export default function useFetch(url: string, deps: any[] = []) {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await protectedAPI.get(url);
      const data = await response.data;
      setData(data);
      setError("");
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, deps);

  return { data, loading, error };
}
