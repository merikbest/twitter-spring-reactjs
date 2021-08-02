import React, {FC, ReactElement} from 'react';
import {Controller, useForm} from "react-hook-form";
import {useHistory} from "react-router-dom";
import {Button, Checkbox} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";

import {useForgotPasswordStyles} from "../ForgotPasswordStyles";
import {ForgotPasswordTextField} from "../ForgotPasswordTextField/ForgotPasswordTextField";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {User} from "../../../store/ducks/user/contracts/state";
import {AuthApi} from "../../../services/api/authApi";

interface ResetPasswordProps {
    user: User | undefined;
}

interface ResetPasswordFormProps {
    password: string;
    password2: string;
}

const ResetPasswordFormSchema = yup.object().shape({
    password: yup.string().min(6, "Too short").required(),
    password2: yup.string().oneOf([yup.ref("password")], "Passwords do not match."),
});

const ResetPassword: FC<ResetPasswordProps> = ({user}): ReactElement => {
    const classes = useForgotPasswordStyles();
    const history = useHistory();
    const {control, register, handleSubmit, formState: {errors}} = useForm<ResetPasswordFormProps>({
        resolver: yupResolver(ResetPasswordFormSchema)
    });

    const onSubmit = (data: ResetPasswordFormProps): void => {
        AuthApi.passwordReset({email: user?.email!, password: data.password, password2: data.password2})
            .then((data) => {
                console.log(data);
                history.push("/account/forgot/password_reset_complete");
            })
            .catch((error) => console.log(error));
    };

    return (
        <>
            <h1>Reset your password</h1>
            <div style={{display: "flex"}}>
                <Avatar
                    alt={`avatar`}
                    className={classes.avatar}
                    src={user?.avatar?.src ? user?.avatar?.src : DEFAULT_PROFILE_IMG}
                />
                <div className={classes.info}>
                    <b>{user?.fullName}</b>
                    <Typography>@{user?.username}</Typography>
                </div>
            </div>
            <p>Strong passwords include numbers, letters, and punctuation marks.
                <span className={classes.more}>Learn more</span>
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div><b>Enter your new password</b></div>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({field: {onChange, value}}) => (
                        <ForgotPasswordTextField
                            id="password"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!errors.password}
                            autoFocus
                        />
                    )}
                />
                <span className={classes.errorMessage}>{errors.password?.message}</span>
                <div style={{marginTop: 10}}><b>Enter your password one more time</b></div>
                <Controller
                    name="password2"
                    control={control}
                    defaultValue=""
                    render={({field: {onChange, value}}) => (
                        <ForgotPasswordTextField
                            id="password2"
                            name="password2"
                            type="password"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={!!errors.password2}
                            autoFocus
                        />
                    )}
                />
                <span className={classes.errorMessage}>{errors.password2?.message}</span>
                <div className={classes.checkbox}>
                    <Checkbox
                        checked={true}
                        name="checkedB"
                        color="primary"
                    />
                    Remember me
                </div>
                <p>Resetting your password will log you out of all your active Twitter sessions.</p>
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Reset password
                </Button>
            </form>
        </>
    );
};

export default ResetPassword;
