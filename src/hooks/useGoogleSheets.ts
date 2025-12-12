import { useState, useEffect, useCallback } from 'react';
import { sheetsService } from '../services/googleSheets';
import type { Transaction } from '../types';

export function useGoogleSheets(autoRefresh = true, refreshInterval = 30000) {
  const [data, setData] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);

  const fetchData = useCallback(async (forceRefresh = false) => {
    try {
      setLoading(true);
      setError(null);

      const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

      let transactions: Transaction[];

      if (!API_KEY || API_KEY === '') {
        console.warn('No API key configured, using mock data');
        transactions = await sheetsService.getMockData();
      } else {
        transactions = await sheetsService.fetchData(forceRefresh);
      }

      setData(transactions);
      setLastUpdate(new Date());
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
      setError(errorMessage);
      console.error('Error fetching sheets data:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => {
      fetchData();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, fetchData]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    lastUpdate,
    refresh,
  };
}
