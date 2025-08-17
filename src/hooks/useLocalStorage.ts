import { useState, useEffect } from 'react';

export function useLocalStorage(
  key: string,
  initialValue: string
): [string, (value: string) => void] {
  const [storedValue, setStoredValue] = useState<string>(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const value = localStorage.getItem(key);
      if (value) setStoredValue(value);
    }
  }, [key]);

  const setValue = (value: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
      setStoredValue(value);
    }
  };

  return [storedValue, setValue];
}
