import React, {ChangeEvent, FC, ReactElement, ReactNode, useState} from 'react';
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import {Button, Dialog, DialogContent, FormControl, InputLabel, Typography} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import format from "date-fns/format";

import {useScheduleModalStyles} from "./ScheduleModalStyles";
import {ScheduleIcon} from "../../../icons";
import {ScheduleModalSelect} from "./ScheduleModalSelect";
import {getDate, getDay, getYear, getMonth, getDaysInMonth, addMonths, addDays} from "date-fns";
import {getDayOfYear, getISODay} from "date-fns/esm";

interface ScheduleModalProps {
    visible?: boolean;
    onClose: () => void;
}

const ScheduleModal: FC<ScheduleModalProps> = ({visible, onClose}): ReactElement | null => {
    const classes = useScheduleModalStyles();
    let dateNow = new Date(Date.now());
    // const formatDay = "1";

    let day2 = String(getDate(dateNow));
    let month2;
    let year2;


    const daysInMonth = getDaysInMonth(dateNow);
    const scheduleDay = getDate(dateNow) + 22;

    if (scheduleDay > daysInMonth) {
        // dateNow = addMonths(dateNow, 1);
        dateNow = addDays(dateNow, 22);
        day2 = String(getDate(dateNow)) // day
        // console.log(day2);
    }

    // console.log(dateNow)


    // dateNow = addMonths(Date.now(), 1);
    // console.log(dateNow);
    console.log(getDate(dateNow))

    const formatMonth = (getMonth(dateNow) < 10) ? ("0" + String(getMonth(dateNow) + 1)) : (String(getMonth(dateNow) + 1));
    const formatDay = (getDate(dateNow) < 10) ? ("0" + day2) : (day2);

    // console.log(dateNow)
    // console.log(formatDay)





    const [month, setMonth] = useState<string>(formatMonth);
    const [day, setDay] = useState<string>(formatDay);
    const [year, setYear] = useState<string>(String(getYear(Date.now())));
    const [hour, setHour] = useState<string>("00");
    const [minute, setMinute] = useState<string>("00");
    const [daysCount, setDaysCount] = useState<number>(28);

    // const dateFormat = format(new Date(`${year}-${month}-${day}T${hour}:${minute}:00Z`), "EEE, MMM d, yyyy 'at' hh:mm a");
    // console.log(month + " " + day + " " + year)
    // console.log(dateFormat)

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

    if (!visible) {
        return null;
    }

    return (
        <Dialog open={visible} onClose={onClose} className={classes.dialog} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">
                <IconButton onClick={onClose} color="secondary" aria-label="close">
                    <CloseIcon style={{fontSize: 26}} color="secondary"/>
                </IconButton>
                Schedule
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Confirm
                </Button>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <div className={classes.contentWrapper}>
                    <div className={classes.infoWrapper}>
                        {ScheduleIcon}
                        <Typography component={"span"} className={classes.text}>
                            {/*{`Will send on ${dateFormat}`}*/}
                        </Typography>
                    </div>
                    <div className={classes.dateWrapper}>
                        <Typography component={"div"} className={classes.subtitle}>
                            Date
                        </Typography>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="select-month">
                                Month
                            </InputLabel>
                            <ScheduleModalSelect
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
                            </ScheduleModalSelect>
                        </FormControl>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="select-day">
                                Day
                            </InputLabel>
                            <ScheduleModalSelect
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
                            </ScheduleModalSelect>
                        </FormControl>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="select-year">
                                Year
                            </InputLabel>
                            <ScheduleModalSelect
                                variant="filled"
                                style={{width: 144,}}
                                labelId="select-year"
                                id="select-year"
                                native
                                value={year}
                                onChange={changeYear}
                                label="Year"
                            >
                                <option value={"2021"}>2021</option>
                                <option value={"2022"}>2022</option>
                                <option value={"2023"}>2023</option>
                            </ScheduleModalSelect>
                        </FormControl>
                    </div>
                    <div className={classes.dateWrapper}>
                        <Typography component={"div"} className={classes.subtitle}>
                            Time
                        </Typography>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="select-hour">
                                Hour
                            </InputLabel>
                            <ScheduleModalSelect
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
                            </ScheduleModalSelect>
                        </FormControl>
                        <FormControl variant="filled">
                            <InputLabel htmlFor="select-minute">
                                Minute
                            </InputLabel>
                            <ScheduleModalSelect
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
                            </ScheduleModalSelect>
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
                    >
                        Scheduled Tweets
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ScheduleModal;
