import { describe, expect, test } from 'bun:test';
import { formatDate } from './date';

describe('formatDate', () => {
  test('formats date-only values consistently in UTC', () => {
    expect(formatDate(new Date('2023-01-29T00:00:00Z'))).toBe('2023年1月29日');
  });
});
