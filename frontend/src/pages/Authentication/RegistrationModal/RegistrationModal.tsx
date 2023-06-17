import React, { FC, ReactElement, ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { FormControl, InputLabel, Link as MuiLink, Typography } from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRegistrationModalStyles } from "./RegistrationModalStyles";
import RegistrationInput from "../RegistrationInput/RegistrationInput";
import { FilledSelect } from "../../../components/FilledSelect/FilledSelect";
import DialogWrapper from "../DialogWrapper/DialogWrapper";
import { selectRegistrationStep1 } from "../../../store/ducks/authentication/selector";
import { fetchRegistration } from "../../../store/ducks/authentication/actionCreators";

export interface RegistrationFormProps {
    username: string;
    email: string;
    month: string;
    day: number;
    year: number;
}

const RegistrationFormSchema = yup.object().shape({
    username: yup.string().min(1, "What is your name?").required(),
    email: yup.string().email("Invalid mail").required("Please enter a valid email address.")
});

const RegistrationModal: FC = (): ReactElement => {
    const classes = useRegistrationModalStyles();
    const dispatch = useDispatch();
    const registrationStep1 = useSelector(selectRegistrationStep1);
    const { control, handleSubmit, setError, formState: { errors } } = useForm<RegistrationFormProps>({
        resolver: yupResolver(RegistrationFormSchema)
    });

    const onSubmit = (data: RegistrationFormProps): void => {
        const { month, day, year } = data;
        let birthday = "";

        if (month !== "" && day !== 0 && year !== 0) {
            birthday = `${month} ${day}, ${year}`;
        }
        dispatch(fetchRegistration({ registrationData: { ...data, birthday }, setError }));
    };

    const showDays = (): ReactNode[] => {
        let days = [];

        for (let i = 1; i <= 31; i++) {
            days.push(<option key={i} value={i}>{i}</option>);
        }
        return days;
    };

    const showYears = (): ReactNode[] => {
        let years = [];

        for (let i = 2021; i >= 1901; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }
        return years;
    };

    return (
        <DialogWrapper isOpen={registrationStep1} onClick={handleSubmit(onSubmit)}>
            <Typography variant={"h3"} component={"div"} className={classes.title}>
                Create your account
            </Typography>
            <FormControl className={classes.inputWrapper} variant="outlined">
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <RegistrationInput
                            name="username"
                            helperText={errors.username?.message}
                            error={!!errors.username}
                            label={"Name"}
                            maxTextLength={50}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <RegistrationInput
                            name="email"
                            helperText={errors.email?.message}
                            error={!!errors.email}
                            label={"Email"}
                            maxTextLength={50}
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </FormControl>
            <MuiLink className={classes.phoneLink} href="#" variant="body1">
                Use phone instead
            </MuiLink>
            <div className={classes.footer}>
                <Typography variant={"h6"} component={"div"}>
                    Date of birth
                </Typography>
                <Typography variant={"subtitle1"} component={"div"}>
                    This will not be shown publicly. Confirm your own age, even if this account is for a
                    business, a pet, or something else.
                </Typography>
                <div className={classes.formControl}>
                    <FormControl variant="filled">
                        <Controller
                            name="month"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <InputLabel htmlFor="select-month">
                                        Month
                                    </InputLabel>
                                    <FilledSelect
                                        name="month"
                                        variant="filled"
                                        style={{ width: 240, marginRight: 12 }}
                                        labelId="select-month"
                                        id="select-month"
                                        native
                                        value={value}
                                        onChange={onChange}
                                        label="Month"
                                    >
                                        <option aria-label="None" />
                                        <option value={"Jan"}>January</option>
                                        <option value={"Feb"}>February</option>
                                        <option value={"Mar"}>March</option>
                                        <option value={"Apr"}>April</option>
                                        <option value={"May"}>May</option>
                                        <option value={"Jun"}>June</option>
                                        <option value={"Jul"}>July</option>
                                        <option value={"Aug"}>August</option>
                                        <option value={"Sep"}>September</option>
                                        <option value={"Oct"}>October</option>
                                        <option value={"Nov"}>November</option>
                                        <option value={"Dec"}>December</option>
                                    </FilledSelect>
                                </>
                            )}
                        />
                    </FormControl>
                    <FormControl variant="filled">
                        <Controller
                            name="day"
                            control={control}
                            defaultValue={0}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <InputLabel htmlFor="select-day">
                                        Day
                                    </InputLabel>
                                    <FilledSelect
                                        name="day"
                                        variant="filled"
                                        style={{ width: 100, marginRight: 12 }}
                                        labelId="select-day"
                                        id="select-day"
                                        native
                                        value={value}
                                        onChange={onChange}
                                        label="Day"
                                    >
                                        <option aria-label="None" />
                                        {showDays()}
                                    </FilledSelect>
                                </>
                            )}
                        />
                    </FormControl>
                    <FormControl variant="filled">
                        <Controller
                            name="year"
                            control={control}
                            defaultValue={0}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <InputLabel htmlFor="select-year">
                                        Year
                                    </InputLabel>
                                    <FilledSelect
                                        name="year"
                                        variant="filled"
                                        style={{ width: 125 }}
                                        labelId="select-year"
                                        id="select-year"
                                        native
                                        value={value}
                                        onChange={onChange}
                                        label="Year"
                                    >
                                        <option aria-label="None" />
                                        {showYears()}
                                    </FilledSelect>
                                </>
                            )}
                        />
                    </FormControl>
                </div>
            </div>
        </DialogWrapper>
    );
};

export default RegistrationModal;
