export function saveToLS(key: string, value: string) {
  console.log('TO LS value = ' + value);
  localStorage.setItem(key, value);
}

export function getFromLS(key: string): string {
  console.log('FROM LS value = ' + localStorage.getItem(key) || '');
  const value = localStorage.getItem(key) || '';
  return value;
}
