import { useEffect, useState } from 'react';

export function useLocalStorage(
  initialValue: string,
  key: string
): [string, (value: string) => void] {
  function getValue() {
    const value = localStorage.getItem(key);

    if (value) return value;
    return initialValue;
  }

  const [value, setValue] = useState(getValue);

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [value]);

  return [value, setValue];
}
