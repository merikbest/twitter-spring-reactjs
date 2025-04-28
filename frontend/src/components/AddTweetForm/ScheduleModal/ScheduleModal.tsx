import React, { ChangeEvent, FC, ReactElement, ReactNode, useEffect, useState } from "react";
import { addDays, getDate, getDaysInMonth, getMonth, getYear, isBefore } from "date-fns";
import { Dialog, DialogContent, FormControl, InputLabel, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { useScheduleModalStyles } from "./ScheduleModalStyles";
import { ScheduleIcon } from "../../../icons";
import { FilledSelect } from "../../FilledSelect/FilledSelect";
import { formatScheduleDate } from "../../../util/format-date-helper";
import ScheduleTitle from "./ScheduleTitle/ScheduleTitle";
import ScheduleTimeZone from "./ScheduleTimeZone/ScheduleTimeZone";
import ScheduleFooter from "./ScheduleFooter/ScheduleFooter";
import { clearScheduleDate, setClosePoll, setScheduleDate } from "../../../store/ducks/addTweetForm/actionCreators";

interface ScheduleModalProps {
    visible?: boolean;
    onClose: () => void;
    onOpenUnsentTweetsModal: () => void;
}

const ScheduleModal: FC<ScheduleModalProps> = ({ visible, onClose, onOpenUnsentTweetsModal }): ReactElement | null => {
    const classes = useScheduleModalStyles();
    const dispatch = useDispatch();
    const [month, setMonth] = useState<string>("");
    const [day, setDay] = useState<string>("");
    const [year, setYear] = useState<string>("");
    const [hour, setHour] = useState<string>("00");
    const [minute, setMinute] = useState<string>("00");
    const [daysCount, setDaysCount] = useState<number>(28);
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [dateFormat, setDateFormat] = useState<string>("");
    const [isValidSelectedDate, setIsValidSelectedDate] = useState<boolean>(false);
    const { t } = useTranslation();

    useEffect(() => {
        if (visible) {
            let dateNow = new Date();
            let scheduledDay = String(getDate(dateNow));

            if (getDate(dateNow) + 2 > getDaysInMonth(dateNow)) {
                dateNow = addDays(dateNow, 2);
            } else {
                scheduledDay = String(getDate(dateNow) + 2);
            }

            const formatYear = String(getYear(dateNow));
            const formatMonth = (getMonth(dateNow) + 1 < 10) ? ("0" + String(getMonth(dateNow) + 1)) : (String(getMonth(dateNow) + 1));
            const formatDay = (parseInt(scheduledDay) < 10) ? ("0" + String(scheduledDay)) : (String(scheduledDay));
            setYear(formatYear);
            handleDaysCount(formatMonth);
            setMonth(formatMonth);
            setDay(formatDay);
            const selectedDate = new Date(`${formatYear}-${formatMonth}-${formatDay}T00:00:00Z`);
            const dateFormat = formatScheduleDate(selectedDate);
            const isValidSelectedDate = isBefore(selectedDate, Date.now());
            setSelectedDate(selectedDate);
            setDateFormat(dateFormat);
            setIsValidSelectedDate(isValidSelectedDate);
        }
    }, [visible]);

    const changeMonth = (event: ChangeEvent<{ value: unknown }>): void => {
        const monthNumber = event.target.value as string;
        setMonth(monthNumber);
        handleDaysCount(monthNumber);
        handleDate(new Date(`${year}-${monthNumber}-${day}T${hour}:${minute}:00Z`));
    };

    const changeDay = (event: ChangeEvent<{ value: unknown }>): void => {
        const dayNumber = event.target.value as string;
        setDay(dayNumber);
        handleDate(new Date(`${year}-${month}-${dayNumber}T${hour}:${minute}:00Z`));
    };

    const changeYear = (event: ChangeEvent<{ value: unknown }>): void => {
        const yearNumber = event.target.value as string;
        setYear(yearNumber);
        handleDate(new Date(`${yearNumber}-${month}-${day}T${hour}:${minute}:00Z`));
    };

    const changeHour = (event: ChangeEvent<{ value: unknown }>): void => {
        const hourNumber = event.target.value as string;
        setHour(hourNumber);
        handleDate(new Date(`${year}-${month}-${day}T${hourNumber}:${minute}:00Z`));
    };

    const changeMinute = (event: ChangeEvent<{ value: unknown }>): void => {
        const minuteNumber = event.target.value as string;
        setMinute(minuteNumber);
        handleDate(new Date(`${year}-${month}-${day}T${hour}:${minuteNumber}:00Z`));
    };

    const handleDaysCount = (monthNumber: string): void => {
        if (["01", "03", "05", "07", "08", "10", "12"].includes(monthNumber)) {
            setDaysCount(31);
        } else if (["04", "06", "09", "11"].includes(monthNumber)) {
            setDaysCount(30);
        } else {
            setDaysCount(28);
        }
    };

    const handleDate = (date: Date) => {
        setSelectedDate(date);
        setDateFormat(formatScheduleDate(date));
        setIsValidSelectedDate(isBefore(date, Date.now()));
    };

    const showYear = (count: number): string => {
        return String(getYear(Date.now()) + count);
    };

    const showDays = (): ReactNode[] => {
        let days: JSX.Element[] = [];

        for (let i = 1; i <= 28; i++) {
            const value = i < 10 ? "0" + i : i;
            days.push(<option key={i} value={value}>{i}</option>);
        }
        return days;
    };

    const showHour = (): ReactNode[] => {
        let days: JSX.Element[] = [];

        for (let i = 0; i < 24; i++) {
            const value = i < 10 ? "0" + i : i;
            days.push(<option key={i} value={value}>{value}</option>);
        }
        return days;
    };

    const showMinute = (): ReactNode[] => {
        let days: JSX.Element[] = [];

        for (let i = 0; i < 60; i++) {
            const value = i < 10 ? "0" + i : i;
            days.push(<option key={i} value={value}>{value}</option>);
        }
        return days;
    };

    const onSubmitScheduleDate = (): void => {
        dispatch(setScheduleDate(selectedDate));
        dispatch(setClosePoll());
        onClose();
    };

    const onSubmitClearScheduleDate = (): void => {
        dispatch(clearScheduleDate());
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog transitionDuration={0} open={visible} onClose={onClose} className={classes.dialog}>
            <ScheduleTitle
                onClose={onClose}
                isValidSelectedDate={isValidSelectedDate}
                onSubmitScheduleDate={onSubmitScheduleDate}
                onSubmitClearScheduleDate={onSubmitClearScheduleDate}
            />
            <DialogContent className={classes.content}>
                <div className={classes.contentWrapper}>
                    {!isValidSelectedDate && (
                        <div className={classes.infoWrapper}>
                            {ScheduleIcon}
                            <Typography variant="subtitle2" component="span">
                                {t("WILL_SEND_ON", {
                                    date: dateFormat,
                                    defaultValue: `Will send on ${dateFormat}`
                                })}
                            </Typography>
                        </div>
                    )}
                    <div className={classes.dateWrapper}>
                        <Typography variant="subtitle1" component="div" className={classes.subtitle}>
                            {t("DATE", { defaultValue: "Date" })}
                        </Typography>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-month">
                                {t("MONTH", { defaultValue: "Month" })}
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{ width: 273, marginRight: 12 }}
                                labelId="select-month"
                                id="select-month"
                                native
                                value={month}
                                onChange={changeMonth}
                                label={t("MONTH", { defaultValue: "Month" })}
                            >
                                <option value="01">{t("JANUARY", { defaultValue: "January" })}</option>
                                <option value="02">{t("FEBRUARY", { defaultValue: "February" })}</option>
                                <option value="03">{t("MARCH", { defaultValue: "March" })}</option>
                                <option value="04">{t("APRIL", { defaultValue: "April" })}</option>
                                <option value="05">{t("MAY", { defaultValue: "May" })}</option>
                                <option value="06">{t("JUNE", { defaultValue: "June" })}</option>
                                <option value="07">{t("JULY", { defaultValue: "July" })}</option>
                                <option value="08">{t("AUGUST", { defaultValue: "August" })}</option>
                                <option value="09">{t("SEPTEMBER", { defaultValue: "September" })}</option>
                                <option value="10">{t("OCTOBER", { defaultValue: "October" })}</option>
                                <option value="11">{t("NOVEMBER", { defaultValue: "November" })}</option>
                                <option value="12">{t("DECEMBER", { defaultValue: "December" })}</option>
                            </FilledSelect>
                        </FormControl>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-day">
                                {t("DAY", { defaultValue: "Day" })}
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{ width: 123, marginRight: 12 }}
                                labelId="select-day"
                                id="select-day"
                                native
                                value={day}
                                onChange={changeDay}
                                label={t("DAY", { defaultValue: "Day" })}
                            >
                                {showDays()}
                                {(daysCount === 30) && (
                                    <>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                    </>
                                )}
                                {(daysCount === 31) && (
                                    <>
                                        <option value="29">29</option>
                                        <option value="30">30</option>
                                        <option value="31">31</option>
                                    </>
                                )}
                            </FilledSelect>
                        </FormControl>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-year">
                                {t("YEAR", { defaultValue: "Year" })}
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{ width: 144 }}
                                labelId="select-year"
                                id="select-year"
                                native
                                value={year}
                                onChange={changeYear}
                                label={t("YEAR", { defaultValue: "Year" })}
                            >
                                <option value={showYear(0)}>
                                    {showYear(0)}
                                </option>
                                <option value={showYear(1)}>
                                    {showYear(1)}
                                </option>
                                <option value={showYear(2)}>
                                    {showYear(2)}
                                </option>
                            </FilledSelect>
                        </FormControl>
                        {isValidSelectedDate && (
                            <Typography variant="subtitle1" component="div" className={classes.errorText}>
                                {t("NOT_VALID_SELECTED_DATE", {
                                    defaultValue: "You can’t schedule a Tweet to send in the past."
                                })}
                            </Typography>
                        )}
                    </div>
                    <div className={classes.dateWrapper}>
                        <Typography variant="subtitle1" component="div" className={classes.subtitle}>
                            {t("TIME", { defaultValue: "Time" })}
                        </Typography>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-hour">
                                {t("HOUR", { defaultValue: "Hour" })}
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{ width: 179, marginRight: 12 }}
                                labelId="select-hour"
                                id="select-hour"
                                native
                                value={hour}
                                onChange={changeHour}
                                label={t("HOUR", { defaultValue: "Hour" })}
                            >
                                {showHour()}
                            </FilledSelect>
                        </FormControl>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-minute">
                                {t("MINUTE", { defaultValue: "Minute" })}
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{ width: 179, marginRight: 12 }}
                                labelId="select-minute"
                                id="select-minute"
                                native
                                value={minute}
                                onChange={changeMinute}
                                label={t("MINUTE", { defaultValue: "Minute" })}
                            >
                                {showMinute()}
                            </FilledSelect>
                        </FormControl>
                    </div>
                    <ScheduleTimeZone />
                </div>
                <ScheduleFooter onOpenUnsentTweetsModal={onOpenUnsentTweetsModal} />
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleModal;
