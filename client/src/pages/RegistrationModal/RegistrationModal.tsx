import React, {ChangeEvent, FC, FormEvent, useState} from 'react';
import {Button, Dialog, FormControl, FormGroup, InputLabel, Select} from "@material-ui/core";
import DialogContent from "@material-ui/core/DialogContent";
import TwitterIcon from "@material-ui/icons/Twitter"

import {useRegistrationModalStyles} from "./RegistrationModalStyles";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {fetchSignUp} from "../../store/ducks/user/actionCreators";
import {RegisterFormProps} from "../SignIn/RegisterModal";
import TweeterInput from "../../components/EditProfileModal/TweetInput/TweeterInput";
import RegistrationInput from "./RegistrationInput/RegistrationInput";
import {CustomSelect} from "./RegistrationSelect/CustomSelect";
import CustomizeModal from "./CustomizeModal/CustomizeModal";

interface RegistrationModalProps {
    open: boolean;
    onClose: () => void;
}

interface RegistrationFormProps {
    username: string;
    email: string;
}

const RegistrationFormSchema = yup.object().shape({
    username: yup.string().min(1, "What is your name?").required(),
    email: yup.string().email("Please enter a valid email address."),
});

const RegistrationModal: FC<RegistrationModalProps> = ({open, onClose}) => {
    const classes = useRegistrationModalStyles();
    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [month, setMonth] = useState<number>(0);
    const [day, setDay] = useState<number>(0);
    const [year, setYear] = useState<number>(0);
    const {control, register, handleSubmit, formState: {errors}} = useForm<RegistrationFormProps>({
        resolver: yupResolver(RegistrationFormSchema)
    });

    const onSubmit = (data: RegistrationFormProps): void => {
        // dispatch(fetchSignUp(data));
        setVisibleModal(true);
    };

    const changeMonth = (event: ChangeEvent<{ value: unknown }>): void => {
        setMonth(event.target.value as number);
    };

    const changeDay = (event: ChangeEvent<{ value: unknown }>): void => {
        setDay(event.target.value as number);
    };

    const changeYear = (event: ChangeEvent<{ value: unknown }>): void => {
        setYear(event.target.value as number);
    };

    const closeModal = (): void => {
        setVisibleModal(false);
    };

    const showDays = () => {
        let days = [];

        for (let i = 1; i <= 31; i++) {
            days.push(<option value={i}>{i}</option>);
        }
        return days;
    };

    const showYears = () => {
        let years = [];

        for (let i = 2021; i >= 1901; i--) {
            years.push(<option value={i}>{i}</option>);
        }
        return years;
    };

    return (
        <>
            <Dialog transitionDuration={0} open={open} onClose={onClose} aria-labelledby="form-dialog-title">
                <DialogContent style={{paddingTop: 0, paddingBottom: 30}} className={classes.container}>
                    <div className={classes.logoIcon}>
                        <TwitterIcon/>
                    </div>
                    <div className={classes.formWrapper}>
                        <div className={classes.title}>
                            Create your account
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl className={classes.inputWrapper} variant="outlined">
                                <Controller
                                    name="username"
                                    control={control}
                                    defaultValue=""
                                    render={({field: {onChange, value}}) => (
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
                                    render={({field: {onChange, value}}) => (
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
                            <div className={classes.link}>Use phone instead</div>
                            <div className={classes.footer}>
                                <b>Date of birth</b>
                                <div className={classes.footerText}>
                                    This will not be shown publicly. Confirm your own age, even if this account is for a
                                    business, a pet, or something else.
                                </div>
                                <FormControl variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="select-month">Month</InputLabel>
                                    <CustomSelect
                                        style={{width: 240, marginRight: 12}}
                                        labelId="select-month"
                                        id="select-month"
                                        native
                                        value={month}
                                        onChange={changeMonth}
                                        label="Month"
                                    >
                                        <option aria-label="None"/>
                                        <option value={1}>January</option>
                                        <option value={2}>February</option>
                                        <option value={3}>March</option>
                                        <option value={4}>April</option>
                                        <option value={5}>May</option>
                                        <option value={6}>June</option>
                                        <option value={7}>July</option>
                                        <option value={8}>August</option>
                                        <option value={9}>September</option>
                                        <option value={10}>October</option>
                                        <option value={11}>November</option>
                                        <option value={12}>December</option>
                                    </CustomSelect>
                                </FormControl>
                                <FormControl style={{margin: "16px 0"}} variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="select-day">Day</InputLabel>
                                    <CustomSelect
                                        style={{width: 100, marginRight: 12}}
                                        labelId="select-day"
                                        id="select-day"
                                        native
                                        value={day}
                                        onChange={changeDay}
                                        label="Day"
                                    >
                                        <option aria-label="None"/>
                                        {showDays()}
                                    </CustomSelect>
                                </FormControl>
                                <FormControl style={{margin: "16px 0"}} variant="outlined" className={classes.formControl}>
                                    <InputLabel htmlFor="select-year">Year</InputLabel>
                                    <CustomSelect
                                        style={{width: 125,}}
                                        labelId="select-year"
                                        id="select-year"
                                        native
                                        value={year}
                                        onChange={changeYear}
                                        label="Year"
                                    >
                                        <option aria-label="None"/>
                                        {showYears()}
                                    </CustomSelect>
                                </FormControl>
                            </div>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Next
                            </Button>
                        </form>
                    </div>
                </DialogContent>
            </Dialog>
            <CustomizeModal open={visibleModal} onClose={closeModal}/>
        </>
    );
};

export default RegistrationModal;
