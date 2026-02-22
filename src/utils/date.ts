export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
