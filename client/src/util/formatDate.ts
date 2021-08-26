import format from "date-fns/format";
import isYesterday from "date-fns/isYesterday";
import isMonday from "date-fns/isMonday";
import isTuesday from "date-fns/isTuesday";
import isWednesday from "date-fns/isWednesday";
import isThursday from "date-fns/isThursday";
import isFriday from "date-fns/isFriday";
import isSaturday from "date-fns/isSaturday";
import isSunday from "date-fns/isSunday";
import isToday from "date-fns/isToday";
import usLang from "date-fns/locale/en-US/index";

export const formatDate = (date: Date): string => {
    return format(date, 'dd MMM.');
};

export const formatChatMessageDate = (date: Date): string => {
    const datePattern = format(date, 'hh:mm a', {locale: usLang});

    if (isToday(date)) return datePattern;

    if (isYesterday(date)) return `Yesterday at ${datePattern}`;

    if (isMonday(date)) return `Mon ${datePattern}`;

    if (isTuesday(date)) return `Tue ${datePattern}`;

    if (isWednesday(date)) return `Wed ${datePattern}`;

    if (isThursday(date)) return `Thu ${datePattern}`;

    if (isFriday(date)) return `Fri ${datePattern}`;

    if (isSaturday(date)) return `Sat ${datePattern}`;

    if (isSunday(date)) return `Sun ${datePattern}`;

    return format(date, 'MMM dd, hh:mm a', {locale: usLang});
};
