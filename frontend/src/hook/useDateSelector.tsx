import React, { useCallback } from "react";

export const useDateSelector = () => {

    const getDaysInMonth = useCallback((month: number, year: number): number => {
        if (!month || !year) return 31;
        return new Date(year, month, 0).getDate();
    }, []);

    const showYears = useCallback((): JSX.Element[] => {
        const years: JSX.Element[] = [];
        for (let i = 2025; i >= 1901; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }
        return years;
    }, []);

    const showDays = useCallback((month: number, year: number): JSX.Element[] => {
        const daysInMonth = getDaysInMonth(month, year);
        const days: JSX.Element[] = [];
        for (let i = 1; i <= daysInMonth; i++) {
            days.push(<option key={i} value={i}>{i}</option>);
        }
        return days;
    }, [getDaysInMonth]);

    return { showYears, showDays };
};
