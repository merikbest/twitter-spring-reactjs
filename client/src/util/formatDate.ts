import formatDistance from 'date-fns/formatDistance'
import ruLang from 'date-fns/locale/ru'

export const formatDate = (date: Date): string => {
    return formatDistance(
        date,
        new Date(),
        { locale: ruLang }
    );
}
