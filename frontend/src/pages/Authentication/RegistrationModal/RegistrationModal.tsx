import React, { FC, ReactElement } from "react";
import { Controller } from "react-hook-form";
import { FormControl, InputLabel, Link as MuiLink, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useRegistrationModalStyles } from "./RegistrationModalStyles";
import RegistrationInput from "../RegistrationInput";
import { FilledSelect } from "../../../components/FilledSelect/FilledSelect";
import DialogWrapper from "../DialogWrapper";
import { useRegistrationModal } from "./useRegistrationModal";
import { useDateSelector } from "../../../hook/useDateSelector";

const RegistrationModal: FC = (): ReactElement => {
    const classes = useRegistrationModalStyles();
    const { t } = useTranslation();
    const { showYears, showDays } = useDateSelector();
    const { registrationStep1, control, watch, handleSubmit, errors, onSubmit } = useRegistrationModal();

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
                            defaultValue={0}
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <InputLabel error={!!errors.month && !!errors.birthdate} htmlFor="select-month">
                                        Month
                                    </InputLabel>
                                    <FilledSelect
                                        name="month"
                                        variant="filled"
                                        style={{ width: 240, marginRight: 12 }}
                                        error={!!errors.month && !!errors.birthdate}
                                        labelId="select-month"
                                        id="select-month"
                                        native
                                        value={value}
                                        onChange={onChange}
                                        label="Month"
                                    >
                                        <option value={0} aria-label="None" />
                                        <option value={1}>{t("JANUARY", { defaultValue: "January" })}</option>
                                        <option value={2}>{t("FEBRUARY", { defaultValue: "February" })}</option>
                                        <option value={3}>{t("MARCH", { defaultValue: "March" })}</option>
                                        <option value={4}>{t("APRIL", { defaultValue: "April" })}</option>
                                        <option value={5}>{t("MAY", { defaultValue: "May" })}</option>
                                        <option value={6}>{t("JUNE", { defaultValue: "June" })}</option>
                                        <option value={7}>{t("JULY", { defaultValue: "July" })}</option>
                                        <option value={8}>{t("AUGUST", { defaultValue: "August" })}</option>
                                        <option value={9}>{t("SEPTEMBER", { defaultValue: "September" })}</option>
                                        <option value={10}>{t("OCTOBER", { defaultValue: "October" })}</option>
                                        <option value={11}>{t("NOVEMBER", { defaultValue: "November" })}</option>
                                        <option value={12}>{t("DECEMBER", { defaultValue: "December" })}</option>
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
                                    <InputLabel error={!!errors.day && !!errors.birthdate} htmlFor="select-day">
                                        Day
                                    </InputLabel>
                                    <FilledSelect
                                        name="day"
                                        variant="filled"
                                        style={{ width: 100, marginRight: 12 }}
                                        error={!!errors.day && !!errors.birthdate}
                                        labelId="select-day"
                                        id="select-day"
                                        native
                                        value={value}
                                        onChange={onChange}
                                        label="Day"
                                    >
                                        <option value={0} aria-label="None" />
                                        {showDays(watch("month"), watch("year"))}
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
                                    <InputLabel error={!!errors.year && !!errors.birthdate} htmlFor="select-year">
                                        Year
                                    </InputLabel>
                                    <FilledSelect
                                        name="year"
                                        variant="filled"
                                        style={{ width: 125 }}
                                        error={!!errors.year && !!errors.birthdate}
                                        labelId="select-year"
                                        id="select-year"
                                        native
                                        value={value}
                                        onChange={onChange}
                                        label="Year"
                                    >
                                        <option value={0} aria-label="None" />
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
