import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { fetchSignUp } from "../../../store/ducks/user/actionCreators";
import { selectRegistrationInfo, selectRegistrationStep5 } from "../../../store/ducks/authentication/selector";

interface PasswordFormProps {
    password: string;
}

const SetPasswordFormSchema = yup.object().shape({
    password: yup.string().min(8, "Your password needs to be at least 8 characters. Please enter a longer one.").required()
});

export const useSetPasswordModal = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const registrationInfo = useSelector(selectRegistrationInfo);
    const registrationStep5 = useSelector(selectRegistrationStep5);

    const { control, handleSubmit, watch, formState: { errors } } = useForm<PasswordFormProps>({
        resolver: yupResolver(SetPasswordFormSchema),
        mode: "onChange"
    });

    const onSubmit: SubmitHandler<PasswordFormProps> = useCallback((data) => {
        dispatch(fetchSignUp({ email: registrationInfo.email, password: data.password, history }));
    }, [dispatch, registrationInfo.email, history]);

    return {
        registrationStep5,
        control,
        handleSubmit,
        watch,
        errors,
        onSubmit
    };
};
