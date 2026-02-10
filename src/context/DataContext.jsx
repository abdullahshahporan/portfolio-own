import { createContext, useContext, useState, useEffect } from 'react';
import defaultData from '../data/portfolioData';

const DataContext = createContext();

const STORAGE_KEY = 'portfolio_data_v1';

export function DataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...defaultData, ...parsed };
      }
    } catch (e) {
      console.error('Error loading saved data:', e);
    }
    return defaultData;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Error saving data:', e);
    }
  }, [data]);

  const updateData = (section, newValue) => {
    setData(prev => ({
      ...prev,
      [section]: newValue
    }));
  };

  const updateNestedData = (section, key, newValue) => {
    setData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: newValue
      }
    }));
  };

  const login = (password) => {
    if (password === data.adminPassword) {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  const resetData = () => {
    setData(defaultData);
    localStorage.removeItem(STORAGE_KEY);
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
      resetData
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
