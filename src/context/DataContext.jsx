import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import defaultData from '../data/portfolioData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(defaultData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch data from MongoDB on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch('/api/data');
        const json = await res.json();
        if (json.data) {
          setData({ ...defaultData, ...json.data });
        }
      } catch (err) {
        console.error('Failed to fetch portfolio data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Save data to MongoDB (debounced via admin actions)
  const saveToDb = useCallback(async (newData) => {
    if (!authToken) return;
    try {
      await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ data: newData }),
      });
    } catch (err) {
      console.error('Failed to save data:', err);
    }
  }, [authToken]);

  const updateData = (section, newValue) => {
    setData(prev => {
      const updated = { ...prev, [section]: newValue };
      if (authToken) saveToDb(updated);
      return updated;
    });
  };

  const updateNestedData = (section, key, newValue) => {
    setData(prev => {
      const updated = {
        ...prev,
        [section]: { ...prev[section], [key]: newValue },
      };
      if (authToken) saveToDb(updated);
      return updated;
    });
  };

  const login = async (password) => {
    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (json.success) {
        setIsAuthenticated(true);
        setAuthToken(json.token);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setAuthToken(null);
  };

  const resetData = async () => {
    setData(defaultData);
    if (authToken) saveToDb(defaultData);
  };

  return (
    <DataContext.Provider value={{
      data,
      setData,
      updateData,
      updateNestedData,
      isAuthenticated,
      login,
      logout,
      resetData,
      loading,
      saveToDb,
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function usePortfolioData() {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error('usePortfolioData must be used within DataProvider');
  }
  return ctx;
}
