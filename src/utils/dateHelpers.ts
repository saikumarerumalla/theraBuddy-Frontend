import { format, formatDistanceToNow, parseISO, isToday, isYesterday, startOfDay, endOfDay } from 'date-fns';


export const formatDate = (date: string | Date, formatStr: string = 'yyyy/MM/dd'): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, formatStr);
};

export const formatDateTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return format(dateObj, 'yyyy/MM/dd HH:mm');
};

export const formatRelativeTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return formatDistanceToNow(dateObj, {
    addSuffix: true,
  });
};

export const formatChatTime = (date: string | Date): string => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;

  if (isToday(dateObj)) {
    return format(dateObj, 'HH:mm');
  } else if (isYesterday(dateObj)) {
    return 'Yesterday';
  } else {
    return format(dateObj, 'MM/dd');
  }
};

export const isDateToday = (date: string | Date): boolean => {
  const dateObj = typeof date === 'string' ? parseISO(date) : date;
  return isToday(dateObj);
};

export const getStartOfDay = (date: Date = new Date()): Date => {
  return startOfDay(date);
};

export const getEndOfDay = (date: Date = new Date()): Date => {
  return endOfDay(date);
};
