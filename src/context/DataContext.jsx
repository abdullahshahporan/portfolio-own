import { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import defaultData from '../data/portfolioData';

const DataContext = createContext();

export function DataProvider({ children }) {
  const [data, setData] = useState(defaultData);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authToken, setAuthToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const dataRef = useRef(data);

  // Keep ref in sync
  useEffect(() => {
    dataRef.current = data;
  }, [data]);

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

  // Save full data to MongoDB - returns true/false
  const saveToDb = useCallback(async (dataToSave) => {
    if (!authToken) return false;
    try {
      const res = await fetch('/api/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ data: dataToSave || dataRef.current }),
      });
      const json = await res.json();
      if (!res.ok) {
        console.error('Save failed:', json.error);
        return false;
      }
      return true;
    } catch (err) {
      console.error('Failed to save data:', err);
      return false;
    }
  }, [authToken]);

  // Update a top-level section (local state only - call saveToDb separately)
  const updateData = useCallback((section, newValue) => {
    setData(prev => {
      const updated = { ...prev, [section]: newValue };
      dataRef.current = updated;
      return updated;
    });
  }, []);

  // Update a nested key within a section (local state only)
  const updateNestedData = useCallback((section, key, newValue) => {
    setData(prev => {
      const updated = {
        ...prev,
        [section]: { ...prev[section], [key]: newValue },
      };
      dataRef.current = updated;
      return updated;
    });
  }, []);

  // Batch update multiple sections at once, then save
  const updateAndSave = useCallback(async (updates) => {
    // updates is an object like { education: [...], personal: { ... } }
    let updated;
    setData(prev => {
      updated = { ...prev, ...updates };
      dataRef.current = updated;
      return updated;
    });
    // Wait a tick for state to settle, then save the ref
    await new Promise(r => setTimeout(r, 0));
    return saveToDb(dataRef.current);
  }, [saveToDb]);

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
    dataRef.current = defaultData;
    return saveToDb(defaultData);
  };

  return (
    <DataContext.Provider value={{
      data,
      setData,
      updateData,
      updateNestedData,
      updateAndSave,
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
