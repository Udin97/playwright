export function formatDate(date: Date, pattern: 'yyyy-MM-dd' | 'dd/MM/yyyy' = 'yyyy-MM-dd'): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, '0');
  const dd = String(date.getDate()).padStart(2, '0');

  return pattern === 'yyyy-MM-dd' ? `${yyyy}-${mm}-${dd}` : `${dd}/${mm}/${yyyy}`;
}

export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

export function today(pattern: 'yyyy-MM-dd' | 'dd/MM/yyyy' = 'yyyy-MM-dd'): string {
  return formatDate(new Date(), pattern);
}
