import { useCallback } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import * as yup from "yup";

import { ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE } from "../../../constants/path-constants";
import { AuthenticationApi } from "../../../services/api/user-service/authenticationApi";
import { AuthUserResponse } from "../../../types/user";

export interface ResetPasswordFormProps {
    password: string;
    password2: string;
}

const ResetPasswordFormSchema = yup.object().shape({
    password: yup.string().min(6, "Too short").required(),
    password2: yup.string().oneOf([yup.ref("password")], "Passwords do not match."),
});

export const useResetPassword = () => {
    const history = useHistory();
    const location = useLocation<{ user: AuthUserResponse }>();

    const { control, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormProps>({
        resolver: yupResolver(ResetPasswordFormSchema),
    });

    const onSubmit: SubmitHandler<ResetPasswordFormProps> = useCallback((data) => {
        AuthenticationApi.passwordReset({
            email: location.state.user?.email!,
            password: data.password,
            password2: data.password2,
        })
            .then(() => history.push(ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE))
            .catch((error) => console.log(error));
    }, [history, location.state.user]);

    return {
        control,
        handleSubmit,
        errors,
        onSubmit,
        user: location.state.user
    };
};
