import format from "date-fns/format";

export const formatDate = (date: Date): string => {
    return format(date, 'dd MMM.');
}
