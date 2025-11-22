import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { selectRegistrationStep1 } from "../../../store/ducks/authentication/selector";
import { fetchRegistration } from "../../../store/ducks/authentication/actionCreators";
import { formatBirthdate } from "../../../util/format-date-helper";

export interface RegistrationFormProps {
    username: string;
    email: string;
    month: number;
    day: number;
    year: number;
    birthdate?: string
}

const RegistrationFormSchema =
    yup.object()
        .shape({
            username: yup
                .string()
                .min(1, "What is your name?")
                .required(),
            email: yup
                .string()
                .email("Invalid mail")
                .required("Please enter a valid email address."),
            year: yup.number().notOneOf([0], "Zero is not allowed"),
            month: yup.number().notOneOf([0], "Zero is not allowed"),
            day: yup.number().notOneOf([0], "Zero is not allowed"),
        })
        .test("birthdate-valid", value => {
            const { year, month, day } = value;
            const allZero = year === 0 && month === 0 && day === 0;
            const allFilled = year !== 0 && month !== 0 && day !== 0;

            if (allZero) {
                return true;
            }
            if (allFilled) {
                return true;
            }
            return new yup.ValidationError(
                "Please enter a valid date",
                value,
                "birthdate"
            );
        });

export const useRegistrationModal = () => {
    const dispatch = useDispatch();
    const registrationStep1 = useSelector(selectRegistrationStep1);

    const { control, watch, handleSubmit, setError, formState: { errors } } = useForm<RegistrationFormProps>({
        resolver: yupResolver(RegistrationFormSchema)
    });

    const onSubmit = useCallback((data: RegistrationFormProps): void => {
        const birthdate = formatBirthdate(data.year, data.month, data.day);
        dispatch(fetchRegistration({ registrationData: { ...data, birthdate }, setError }));
    }, [dispatch, setError]);

    return { registrationStep1, control, watch, handleSubmit, errors, onSubmit };
};
