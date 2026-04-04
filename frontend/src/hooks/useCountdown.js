import { useState, useEffect } from 'react';

export const useCountdown = (targetDate, serverTime = null) => {
  const [distance, setDistance] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [hasEnded, setHasEnded] = useState(false);

  useEffect(() => {
    let offset = 0;
    if (serverTime) {
      offset = serverTime - Date.now();
    }

    const updateCountdown = () => {
      const now = serverTime ? Date.now() + offset : Date.now();
      const target = new Date(targetDate).getTime();
      const diff = target - now;

      if (diff <= 0) {
        setIsLive(true);
        setHasEnded(true);
        setDistance(0);
      } else {
        setIsLive(false);
        setDistance(diff);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [targetDate, serverTime]);

  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return {
    hours: String(hours).padStart(2, '0'),
    minutes: String(minutes).padStart(2, '0'),
    seconds: String(seconds).padStart(2, '0'),
    isLive,
    hasEnded,
    totalSeconds: Math.floor(distance / 1000),
  };
};

export const usePagination = (totalPages, onPageChange) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (page) => {
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
      onPageChange(page);
    }
  };

  return { currentPage, handlePageChange, totalPages };
};

export const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
};
