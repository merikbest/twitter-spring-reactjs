import React, { FC, ReactElement } from "react";
import { Controller } from "react-hook-form";
import { FormControl, InputLabel, Link as MuiLink, Typography } from "@material-ui/core";

import { useRegistrationModalStyles } from "./RegistrationModalStyles";
import RegistrationInput from "../RegistrationInput";
import { FilledSelect } from "../../../components/FilledSelect/FilledSelect";
import DialogWrapper from "../DialogWrapper";
import { useRegistrationModal } from "./useRegistrationModal";

const RegistrationModal: FC = (): ReactElement => {
    const classes = useRegistrationModalStyles();
    const {
        registrationStep1,
        control,
        handleSubmit,
        errors,
        onSubmit,
        showDays,
        showYears
    } = useRegistrationModal();

    return (
        <DialogWrapper isOpen={registrationStep1} onClick={handleSubmit(onSubmit)}>
            <Typography variant="h3" component="div" className={classes.title}>
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
                            label="Name"
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
                            label="Email"
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
                <Typography variant="h6" component="div">
                    Date of birth
                </Typography>
                <Typography variant="subtitle1" component="div">
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
                                        <option value="Jan">January</option>
                                        <option value="Feb">February</option>
                                        <option value="Mar">March</option>
                                        <option value="Apr">April</option>
                                        <option value="May">May</option>
                                        <option value="Jun">June</option>
                                        <option value="Jul">July</option>
                                        <option value="Aug">August</option>
                                        <option value="Sep">September</option>
                                        <option value="Oct">October</option>
                                        <option value="Nov">November</option>
                                        <option value="Dec">December</option>
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
