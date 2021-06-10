import React, {FC, ReactElement} from 'react';
import * as yup from "yup";
import {useForm, Controller} from "react-hook-form";
import {yupResolver} from '@hookform/resolvers/yup';
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";

import ModalBlock from "../../components/ModalBlock/ModalBlock";
import {useStylesSignIn} from "./SignIn";

interface LoginModalProps {
    open: boolean;
    onClose: () => void;
}

export interface LoginFormProps {
    email: string;
    password: string;
}

const LoginFormSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().min(6).required(),
});

const LoginModal: FC<LoginModalProps> = ({open, onClose}): ReactElement => {
    const classes = useStylesSignIn();
    const {control, register, handleSubmit, formState: {errors}} = useForm<LoginFormProps>({
        resolver: yupResolver(LoginFormSchema)
    });
    const onSubmit = (data: LoginFormProps) => console.log(data);

    return (
        <ModalBlock
            visible={open}
            onClose={onClose}
            classes={classes}
            title="Войти в аккаунт">
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl className={classes.loginFormControl} component="fieldset" fullWidth>
                    <FormGroup aria-label="position" row>
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    label="E-Mail"
                                    id="email"
                                    name="email"
                                    type="email"
                                    variant="filled"
                                    value={value}
                                    onChange={onChange}
                                    className={classes.loginSideField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={errors.email?.message}
                                    error={!!errors.email}
                                    fullWidth
                                    autoFocus
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    label="Пароль"
                                    id="password"
                                    name="password"
                                    type="password"
                                    variant="filled"
                                    value={value}
                                    onChange={onChange}
                                    className={classes.loginSideField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={errors.password?.message}
                                    error={!!errors.password}
                                    fullWidth
                                    autoFocus
                                />
                            )}
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Войти
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </ModalBlock>
    );
};

export default LoginModal;
