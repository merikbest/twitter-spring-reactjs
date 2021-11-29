import React, {ChangeEvent, FC, ReactElement, ReactNode, useState} from 'react';
import {addDays, getDate, getDaysInMonth, getMonth, getYear, isBefore} from "date-fns";
import {Button, Dialog, DialogContent, FormControl, InputLabel, Typography} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";

import {useScheduleModalStyles} from "./ScheduleModalStyles";
import {ScheduleIcon} from "../../../icons";
import {FilledSelect} from "../../FilledSelect/FilledSelect";
import {formatScheduleDate} from "../../../util/formatDate";
import CloseButton from "../../CloseButton/CloseButton";

interface ScheduleModalProps {
    visible?: boolean;
    selectedScheduleDate: Date | null;
    onClose: () => void;
    handleScheduleDate: (date: Date) => void;
    clearScheduleDate: () => void;
    onOpenUnsentTweetsModal: () => void;
}

const ScheduleModal: FC<ScheduleModalProps> = (
    {
        visible,
        onClose,
        handleScheduleDate,
        selectedScheduleDate,
        clearScheduleDate,
        onOpenUnsentTweetsModal
    }
): ReactElement | null => {
    const classes = useScheduleModalStyles();
    let dateNow = new Date();
    let scheduledDay = String(getDate(dateNow));

    if (getDate(dateNow) + 2 > getDaysInMonth(dateNow)) {
        dateNow = addDays(dateNow, 2);
    } else {
        scheduledDay = String(getDate(dateNow) + 2);
    }

    const formatMonth = (getMonth(dateNow) < 10) ? ("0" + String(getMonth(dateNow) + 1)) : (String(getMonth(dateNow) + 1));
    const formatDay = (getDate(dateNow) < 10) ? ("0" + String(getDate(dateNow))) : (String(scheduledDay));
    const [month, setMonth] = useState<string>(formatMonth);
    const [day, setDay] = useState<string>(formatDay);
    const [year, setYear] = useState<string>(String(getYear(dateNow)));
    const [hour, setHour] = useState<string>("00");
    const [minute, setMinute] = useState<string>("00");
    const [daysCount, setDaysCount] = useState<number>(28);

    const selectedDate = new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`);
    const dateFormat = formatScheduleDate(selectedDate);
    const isValidSelectedDate = isBefore(selectedDate, Date.now());

    const changeMonth = (event: ChangeEvent<{ value: unknown }>): void => {
        const monthNumber = event.target.value as string;

        if (["01", "03", "05", "07", "08", "10", "12"].includes(monthNumber)) {
            setDaysCount(31);
        } else if (["04", "06", "09", "11"].includes(monthNumber)) {
            setDaysCount(30);
        } else {
            setDaysCount(28);
        }
        setMonth(monthNumber);
    };

    const changeDay = (event: ChangeEvent<{ value: unknown }>): void => {
        setDay(event.target.value as string);
    };

    const changeYear = (event: ChangeEvent<{ value: unknown }>): void => {
        setYear(event.target.value as string);
    };

    const changeHour = (event: ChangeEvent<{ value: unknown }>): void => {
        setHour(event.target.value as string);
    };

    const changeMinute = (event: ChangeEvent<{ value: unknown }>): void => {
        setMinute(event.target.value as string);
    };

    const showYear = (count: number): string => {
        return String(getYear(Date.now()) + count);
    };

    const showDays = (): ReactNode[] => {
        let days = [];

        for (let i = 1; i <= 28; i++) {
            const value = i < 10 ? "0" + i : i;
            days.push(<option value={value}>{i}</option>);
        }
        return days;
    };

    const showHour = (): ReactNode[] => {
        let days = [];

        for (let i = 0; i < 24; i++) {
            const value = i < 10 ? "0" + i : i;
            days.push(<option value={value}>{value}</option>);
        }
        return days;
    };

    const showMinute = (): ReactNode[] => {
        let days = [];

        for (let i = 0; i < 60; i++) {
            const value = i < 10 ? "0" + i : i;
            days.push(<option value={value}>{value}</option>);
        }
        return days;
    };

    const onSubmitScheduleDate = (): void => {
        handleScheduleDate(selectedDate);
        onClose();
    };

    const onSubmitClearScheduleDate = (): void => {
        clearScheduleDate();
        onClose();
    };

    if (!visible) {
        return null;
    }

    return (
        <Dialog
            transitionDuration={0}
            open={visible}
            onClose={onClose}
            className={classes.dialog}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <CloseButton onClose={onClose}/>
                Schedule
                <div className={classes.buttonWrapper}>
                    {selectedScheduleDate && (
                        <Button
                            className={classes.clearButton}
                            onClick={onSubmitClearScheduleDate}
                            type="submit"
                            variant="outlined"
                            color="primary"
                            disabled={isValidSelectedDate}
                        >
                            Clear
                        </Button>
                    )}
                    <Button
                        className={classes.submitButton}
                        onClick={onSubmitScheduleDate}
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={isValidSelectedDate}
                    >
                        {selectedScheduleDate ? "Update" : "Confirm"}
                    </Button>
                </div>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className={classes.contentWrapper}>
                    {!isValidSelectedDate && (
                        <div className={classes.infoWrapper}>
                            {ScheduleIcon}
                            <Typography component={"span"} className={classes.text}>
                                {`Will send on ${dateFormat}`}
                            </Typography>
                        </div>
                    )}
                    <div className={classes.dateWrapper}>
                        <Typography component={"div"} className={classes.subtitle}>
                            Date
                        </Typography>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-month">
                                Month
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{width: 273, marginRight: 12}}
                                labelId="select-month"
                                id="select-month"
                                native
                                value={month}
                                onChange={changeMonth}
                                label="Month"
                            >
                                <option value={"01"}>January</option>
                                <option value={"02"}>February</option>
                                <option value={"03"}>March</option>
                                <option value={"04"}>April</option>
                                <option value={"05"}>May</option>
                                <option value={"06"}>June</option>
                                <option value={"07"}>July</option>
                                <option value={"08"}>August</option>
                                <option value={"09"}>September</option>
                                <option value={"10"}>October</option>
                                <option value={"11"}>November</option>
                                <option value={"12"}>December</option>
                            </FilledSelect>
                        </FormControl>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-day">
                                Day
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{width: 123, marginRight: 12}}
                                labelId="select-day"
                                id="select-day"
                                native
                                value={day}
                                onChange={changeDay}
                                label="Day"
                            >
                                {showDays()}
                                {(daysCount === 30) && (
                                    <>
                                        <option value={"29"}>29</option>
                                        <option value={"30"}>30</option>
                                    </>
                                )}
                                {(daysCount === 31) && (<option value={"31"}>31</option>)}
                            </FilledSelect>
                        </FormControl>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-year">
                                Year
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{width: 144,}}
                                labelId="select-year"
                                id="select-year"
                                native
                                value={year}
                                onChange={changeYear}
                                label="Year"
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
                            <Typography component={"div"} className={classes.errorText}>
                                You can’t schedule a Tweet to send in the past.
                            </Typography>
                        )}
                    </div>
                    <div className={classes.dateWrapper}>
                        <Typography component={"div"} className={classes.subtitle}>
                            Time
                        </Typography>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-hour">
                                Hour
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{width: 179, marginRight: 12}}
                                labelId="select-hour"
                                id="select-hour"
                                native
                                value={hour}
                                onChange={changeHour}
                                label="Hour"
                            >
                                {showHour()}
                            </FilledSelect>
                        </FormControl>
                        <FormControl variant="filled" error={isValidSelectedDate}>
                            <InputLabel htmlFor="select-minute">
                                Minute
                            </InputLabel>
                            <FilledSelect
                                variant="filled"
                                style={{width: 179, marginRight: 12}}
                                labelId="select-minute"
                                id="select-minute"
                                native
                                value={minute}
                                onChange={changeMinute}
                                label="Minute"
                            >
                                {showMinute()}
                            </FilledSelect>
                        </FormControl>
                    </div>
                    <div className={classes.dateWrapper}>
                        <Typography component={"div"} className={classes.subtitle}>
                            Time zone
                        </Typography>
                        <Typography component={"div"} className={classes.title}>
                            {Intl.DateTimeFormat().resolvedOptions().timeZone + " Standard Time"}
                        </Typography>
                    </div>
                </div>
                <div className={classes.footer}>
                    <Button
                        className={classes.outlinedButton}
                        color="primary"
                        variant="outlined"
                        onClick={onOpenUnsentTweetsModal}
                    >
                        Scheduled Tweets
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleModal;
