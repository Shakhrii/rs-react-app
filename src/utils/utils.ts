export function saveToLS(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getFromLS(key: string): string {
  return localStorage.getItem(key) ?? '';
}
