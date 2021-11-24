import dayjs from 'dayjs';

export const humanizeDate = (date: string, formatString: string): string => dayjs(date).format(formatString);

export function getUniqueItems<T>(items: T[]): T[] {
  return [...new Set(items)];
}
