import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

export const useRegistrationModal = () => {
    const dispatch = useDispatch();
    const registrationStep1 = useSelector(selectRegistrationStep1);

    const { control, handleSubmit, setError, formState: { errors } } = useForm<RegistrationFormProps>({
        resolver: yupResolver(RegistrationFormSchema)
    });

    const onSubmit = useCallback((data: RegistrationFormProps): void => {
        const { month, day, year } = data;
        let birthday = "";

        if (month !== "" && day !== 0 && year !== 0) {
            birthday = `${month} ${day}, ${year}`;
        }
        dispatch(fetchRegistration({ registrationData: { ...data, birthday }, setError }));
    }, [dispatch, setError]);

    const showDays = useCallback((): JSX.Element[] => {
        const days: JSX.Element[] = [];
        for (let i = 1; i <= 31; i++) {
            days.push(<option key={i} value={i}>{i}</option>);
        }
        return days;
    }, []);

    const showYears = useCallback((): JSX.Element[] => {
        const years: JSX.Element[] = [];
        for (let i = 2021; i >= 1901; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }
        return years;
    }, []);

    return {
        registrationStep1,
        control,
        handleSubmit,
        errors,
        onSubmit,
        showDays,
        showYears
    };
};
