import React, {FC, ReactElement, useEffect} from 'react';
import {Button, Divider, Link as MuiLink} from "@material-ui/core";
import classnames from "classnames";
import * as yup from "yup";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";

import {useChangeYourPasswordStyles} from "./ChangeYourPasswordStyles";
import {ChangeInfoTextField} from "../../ChangeInfoTextField/ChangeInfoTextField";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {AuthApi} from "../../../../services/api/authApi";
import {SnackbarProps, withSnackbar} from "../../../../hoc/withSnackbar";
import ActionSnackbar from "../../../../components/ActionSnackbar/ActionSnackbar";

interface ChangeYourPasswordFormProps {
    currentPassword: string;
    password: string;
    password2: string;
}

const ChangeYourPasswordFormSchema = yup.object().shape({
    password: yup.string().min(8, "Your password needs to be at least 8 characters. Please enter a longer one.").required(),
    password2: yup.string().oneOf([yup.ref("password")], "Passwords do not match."),
});

const ChangeYourPassword: FC<SnackbarProps> = (
    {
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useChangeYourPasswordStyles();
    const {
        control,
        register,
        handleSubmit,
        setError,
        formState: {errors},
        getValues,
        reset
    } = useForm<ChangeYourPasswordFormProps>({
        resolver: yupResolver(ChangeYourPasswordFormSchema),
    });
    
    useEffect(() => {
        document.title = "Change your password / Twitter";
    }, []);

    const onSubmit = (data: ChangeYourPasswordFormProps): void => {
        AuthApi.currentPasswordReset({
            currentPassword: data.currentPassword,
            password: data.password,
            password2: data.password2
        }).then((response) => {
            setSnackBarMessage!(response.data);
            setOpenSnackBar!(true);
            reset();
        }).catch((error) => {
            const errors = error.response.data;

            if (errors.currentPassword) {
                setError("currentPassword", {type: "server", message: errors.currentPassword});
            }
            if (errors.password) {
                setError("password", {type: "server", message: errors.password});
            }
            if (errors.password2) {
                setError("password2", {type: "server", message: errors.password2});
            }
        });
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={globalClasses.itemInfoWrapper}>
                    <Controller
                        name="currentPassword"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}}) => (
                            <ChangeInfoTextField
                                id="currentPassword"
                                name="currentPassword"
                                type="password"
                                label="Current password"
                                value={value}
                                onChange={onChange}
                                error={!!errors.currentPassword}
                                helperText={errors.currentPassword?.message}
                                variant="filled"
                                fullWidth
                            />
                        )}
                    />
                    <MuiLink href="#" variant="body1">
                        Forgot password?
                    </MuiLink>
                </div>
                <Divider/>
                <div className={globalClasses.itemInfoWrapper}>
                    <Controller
                        name="password"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}}) => (
                            <ChangeInfoTextField
                                id="password"
                                name="password"
                                type="password"
                                label="New password"
                                value={value}
                                onChange={onChange}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                                variant="filled"
                                fullWidth
                            />
                        )}
                    />
                </div>
                <div className={globalClasses.itemInfoWrapper}>
                    <Controller
                        name="password2"
                        control={control}
                        defaultValue=""
                        render={({field: {onChange, value}}) => (
                            <ChangeInfoTextField
                                id="password2"
                                name="password2"
                                type="password"
                                label="Confirm password"
                                value={value}
                                onChange={onChange}
                                error={!!errors.password2}
                                helperText={errors.password2?.message}
                                variant="filled"
                                fullWidth
                            />
                        )}
                    />
                </div>
                <Divider/>
                <div className={classnames(classes.buttonWrapper, globalClasses.itemInfoWrapper)}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        size="small"
                    >
                        Save
                    </Button>
                </div>
                <ActionSnackbar
                    snackBarMessage={snackBarMessage!}
                    openSnackBar={openSnackBar!}
                    onCloseSnackBar={onCloseSnackBar!}
                />
            </form>
        </>
    );
};

export default withSnackbar(ChangeYourPassword);
