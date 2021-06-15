import React, {FC, ReactElement, useEffect, useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useForm, Controller} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from '@hookform/resolvers/yup';
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import {Button} from "@material-ui/core";
import {Color} from '@material-ui/lab/Alert';

import ModalBlock from "../../components/ModalBlock/ModalBlock";
import {useStylesSignIn} from "./SignIn";
import {selectUserStatus} from "../../store/ducks/user/selectors";
import {fetchSignIn} from "../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../store/types";

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
    const dispatch = useDispatch();
    const {control, register, handleSubmit, formState: {errors}} = useForm<LoginFormProps>({
        resolver: yupResolver(LoginFormSchema)
    });
    const openNotificationRef = useRef<(text: string, type: Color) => void>(() => {
    });
    const loadingStatus = useSelector(selectUserStatus);

    const onSubmit = async (data: LoginFormProps) => {
        dispatch(fetchSignIn(data));
    };

    useEffect(() => {
        if (loadingStatus === LoadingStatus.SUCCESS) {
            openNotificationRef.current('Авторизация успешна!', 'success');
            onClose();
        } else if (loadingStatus === LoadingStatus.ERROR) {
            openNotificationRef.current('Неверный логин или пароль', 'error');
        }
    }, [loadingStatus, onClose]);

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
                        <Button
                            disabled={loadingStatus === LoadingStatus.LOADING}
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth>
                            Войти
                        </Button>
                    </FormGroup>
                </FormControl>
            </form>
        </ModalBlock>
    );
};

export default LoginModal;
