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
import {selectUserStatus} from "../../store/ducks/user/selectors";
import {fetchSignUp} from "../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../store/types";
import {useStylesSignIn} from "./SignInStyles";

interface RegisterModalProps {
    open: boolean;
    onClose: () => void;
}

export interface RegisterFormProps {
    email: string;
    username: string;
    fullName: string;
    password: string;
    password2: string;
}

const RegisterFormSchema = yup.object().shape({
    email: yup.string().email("Неверная почта").required("Введите почту"),
    username: yup.string().required("Введите логин"),
    fullName: yup.string().required("Введите своё имя"),
    password: yup.string().min(6, "Минимальная длина пароля 6 символов").required(),
    password2: yup.string().oneOf([yup.ref("password")], "Пароли не соответствуют"),
});

const RegisterModal: FC<RegisterModalProps> = ({open, onClose}): ReactElement => {
    const classes = useStylesSignIn();
    const dispatch = useDispatch();
    const {control, register, handleSubmit, formState: {errors}} = useForm<RegisterFormProps>({
        resolver: yupResolver(RegisterFormSchema)
    });
    const openNotificationRef = useRef<(text: string, type: Color) => void>(() => {
    });
    const loadingStatus = useSelector(selectUserStatus);

    const onSubmit = async (data: RegisterFormProps) => {
        // dispatch(fetchSignUp(data));
    };

    useEffect(() => {
        if (loadingStatus === LoadingStatus.SUCCESS) {
            openNotificationRef.current('Регистрация успешна!', 'success');
            onClose();
        } else if (loadingStatus === LoadingStatus.ERROR) {
            openNotificationRef.current('Ошибка при регистрации', 'error');
        }
    }, [loadingStatus, onClose]);

    return (
        <ModalBlock
            visible={open}
            onClose={onClose}
            title="Создайте учетную запись">
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
                                    className={classes.registerField}
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
                            name="username"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    label="Логин"
                                    id="username"
                                    name="username"
                                    type="text"
                                    variant="filled"
                                    value={value}
                                    onChange={onChange}
                                    className={classes.registerField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={errors.username?.message}
                                    error={!!errors.username}
                                    fullWidth
                                    autoFocus
                                />
                            )}
                        />
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    label="Имя"
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    variant="filled"
                                    value={value}
                                    onChange={onChange}
                                    className={classes.registerField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={errors.fullName?.message}
                                    error={!!errors.fullName}
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
                                    className={classes.registerField}
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
                        <Controller
                            name="password2"
                            control={control}
                            defaultValue=""
                            render={({field: {onChange, value}}) => (
                                <TextField
                                    label="Подтвердите пароль"
                                    id="password2"
                                    name="password2"
                                    type="password2"
                                    variant="filled"
                                    value={value}
                                    onChange={onChange}
                                    className={classes.registerField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    helperText={errors.password2?.message}
                                    error={!!errors.password2}
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

export default RegisterModal;
