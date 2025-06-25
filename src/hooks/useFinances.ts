import { useState, useEffect } from 'react';
import {API_URL} from '../constants';
import { FinancialData } from "@/types";

export const useFinances = () => {
  const [data, setData] = useState<FinancialData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch(err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();

  }, []);

  return { data, loading, error };

}