import dayjs from 'dayjs';

export enum DateFormat {
  'MMMM YYYY' = 'MMMM YYYY',
}

export const humanizeDate = (date: Date, formatString: DateFormat): string => dayjs(date).format(formatString);
