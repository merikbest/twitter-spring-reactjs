import React, { FC, ReactElement } from "react";
import { History, LocationState } from "history";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useSetPasswordModalStyles } from "./SetPasswordModalStyles";
import { RegistrationInputField } from "../RegistrationInput/RegistrationInputField";
import { fetchSignUp } from "../../../store/ducks/user/actionCreators";
import DialogWrapper from "../DialogWrapper/DialogWrapper";
import { selectRegistrationInfo, selectRegistrationStep5 } from "../../../store/ducks/authentication/selector";

interface PasswordFormProps {
    password: string;
}

export interface EndRegistrationRequest {
    email: string;
    password: string;
    history: History<LocationState>;
}

const SetPasswordFormSchema = yup.object().shape({
    password: yup.string().min(8, "Your password needs to be at least 8 characters. Please enter a longer one.").required()
});

const SetPasswordModal: FC = (): ReactElement => {
    const classes = useSetPasswordModalStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const registrationInfo = useSelector(selectRegistrationInfo);
    const registrationStep5 = useSelector(selectRegistrationStep5);
    const { control, handleSubmit, watch, formState: { errors } } = useForm<PasswordFormProps>({
        resolver: yupResolver(SetPasswordFormSchema),
        mode: "onChange"
    });

    const onSubmit = (data: PasswordFormProps): void => {
        dispatch(fetchSignUp({ email: registrationInfo.email, password: data.password, history }));
    };

    return (
        <DialogWrapper
            isOpen={registrationStep5}
            onClick={handleSubmit(onSubmit)}
            disabledButton={!watch("password")}
        >
            <Typography variant={"h3"} component={"div"} className={classes.title}>
                You'll need a password
            </Typography>
            <Typography variant={"subtitle1"} component={"div"} className={classes.subtitle}>
                Make sure it’s 8 characters or more.
            </Typography>
            <div className={classes.controllerWrapper}>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <RegistrationInputField
                            label="Password"
                            id="password"
                            name="password"
                            type="password"
                            variant="filled"
                            value={value}
                            onChange={onChange}
                            helperText={errors.password?.message}
                            error={!!errors.password}
                            fullWidth
                        />
                    )}
                />
            </div>
        </DialogWrapper>
    );
};

export default SetPasswordModal;
