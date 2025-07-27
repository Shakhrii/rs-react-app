export function saveToLS(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getFromLS(key: string): string {
  const value = localStorage.getItem(key) || '';
  return value;
}
