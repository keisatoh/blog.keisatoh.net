export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    timeZone: 'UTC',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
