import React, { ChangeEvent, FC, ReactElement, ReactNode, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Dialog, FormControl, InputLabel, Link as MuiLink, Typography } from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import TwitterIcon from "@material-ui/icons/Twitter";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useRegistrationModalStyles } from "./RegistrationModalStyles";
import RegistrationInput from "./RegistrationInput/RegistrationInput";
import { FilledSelect } from "../../components/FilledSelect/FilledSelect";
import { RegistrationRequest } from "../../types/auth";
import { RegistrationApi } from "../../services/api/user-service/registrationApi";

interface RegistrationModalProps {
    open: boolean;
    onClose: () => void;
    onOpenCustomize: (value: boolean | ((prevVar: boolean) => boolean)) => void;
    onChangeRegistrationInfo: (data: RegistrationRequest) => void;
}

interface RegistrationFormProps {
    username: string;
    email: string;
}

const RegistrationFormSchema = yup.object().shape({
    username: yup.string().min(1, "What is your name?").required(),
    email: yup.string().email("Invalid mail").required("Please enter a valid email address.")
});

const RegistrationModal: FC<RegistrationModalProps> = (
    {
        open,
        onClose,
        onOpenCustomize,
        onChangeRegistrationInfo
    }
): ReactElement => {
    const classes = useRegistrationModalStyles();
    const [month, setMonth] = useState<string>("");
    const [day, setDay] = useState<number>(0);
    const [year, setYear] = useState<number>(0);
    const { control, handleSubmit, setError, formState: { errors } } = useForm<RegistrationFormProps>({
        resolver: yupResolver(RegistrationFormSchema)
    });

    const onSubmit = (data: RegistrationFormProps): void => {
        let birthday = "";

        if (month !== "" && day !== 0 && year !== 0) {
            birthday = month + " " + day + ", " + year;
        }
        const registrationData: RegistrationRequest = { username: data.username, email: data.email, birthday: birthday };
        RegistrationApi.registration(registrationData)
            .then(() => {
                onChangeRegistrationInfo(registrationData);
                onOpenCustomize(true);
            })
            .catch((error) => {
                const errors = error.response.data;

                if (errors.username) {
                    setError("username", { type: "server", message: errors.username });
                }
                if (errors.email) {
                    setError("email", { type: "server", message: errors.email });
                }
            });
    };

    const changeMonth = (event: ChangeEvent<{ value: unknown }>): void => {
        setMonth(event.target.value as string);
    };

    const changeDay = (event: ChangeEvent<{ value: unknown }>): void => {
        setDay(event.target.value as number);
    };

    const changeYear = (event: ChangeEvent<{ value: unknown }>): void => {
        setYear(event.target.value as number);
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
        <Dialog
            transitionDuration={0}
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogContent style={{ paddingTop: 0, paddingBottom: 0 }} className={classes.container}>
                <div className={classes.logoIcon}>
                    <TwitterIcon />
                </div>
                <div>
                    <Typography variant={"h3"} component={"div"} className={classes.title}>
                        Create your account
                    </Typography>
                    <form onSubmit={handleSubmit(onSubmit)}>
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
                            <FormControl variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="select-month">
                                    Month
                                </InputLabel>
                                <FilledSelect
                                    variant="filled"
                                    style={{ width: 240, marginRight: 12 }}
                                    labelId="select-month"
                                    id="select-month"
                                    native
                                    value={month}
                                    onChange={changeMonth}
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
                            </FormControl>
                            <FormControl style={{ margin: "16px 0" }} variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="select-day">
                                    Day
                                </InputLabel>
                                <FilledSelect
                                    variant="filled"
                                    style={{ width: 100, marginRight: 12 }}
                                    labelId="select-day"
                                    id="select-day"
                                    native
                                    value={day}
                                    onChange={changeDay}
                                    label="Day"
                                >
                                    <option aria-label="None" />
                                    {showDays()}
                                </FilledSelect>
                            </FormControl>
                            <FormControl style={{ margin: "16px 0" }} variant="filled" className={classes.formControl}>
                                <InputLabel htmlFor="select-year">
                                    Year
                                </InputLabel>
                                <FilledSelect
                                    variant="filled"
                                    style={{ width: 125 }}
                                    labelId="select-year"
                                    id="select-year"
                                    native
                                    value={year}
                                    onChange={changeYear}
                                    label="Year"
                                >
                                    <option aria-label="None" />
                                    {showYears()}
                                </FilledSelect>
                            </FormControl>
                        </div>
                        <div className={classes.buttonWrapper}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="small"
                                fullWidth
                            >
                                Next
                            </Button>
                        </div>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default RegistrationModal;
