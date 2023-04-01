import React, { FC, ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";
import { Button, Checkbox } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { ForgotPasswordTextField } from "../ForgotPasswordTextField/ForgotPasswordTextField";
import { ACCOUNT_SECURITY_TIPS, DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { useResetPasswordStyles } from "./ResetPasswordStyles";
import { AuthUserResponse } from "../../../types/user";
import { ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE } from "../../../constants/path-constants";
import { AuthenticationApi } from "../../../services/api/user-service/authenticationApi";

interface ResetPasswordFormProps {
    password: string;
    password2: string;
}

const ResetPasswordFormSchema = yup.object().shape({
    password: yup.string().min(6, "Too short").required(),
    password2: yup.string().oneOf([yup.ref("password")], "Passwords do not match.")
});

const ResetPassword: FC = (): ReactElement => {
    const classes = useResetPasswordStyles();
    const history = useHistory();
    const location = useLocation<{ user: AuthUserResponse }>();
    const { control, handleSubmit, formState: { errors } } = useForm<ResetPasswordFormProps>({
        resolver: yupResolver(ResetPasswordFormSchema)
    });

    const onSubmit = (data: ResetPasswordFormProps): void => {
        AuthenticationApi.passwordReset({
            email: location.state.user?.email!,
            password: data.password, password2: data.password2
        })
            .then(() => history.push(ACCOUNT_FORGOT_PASSWORD_RESET_COMPLETE))
            .catch((error) => console.log(error));
    };

    return (
        <>
            <Typography component={"div"} className={classes.title}>
                Reset your password
            </Typography>
            <div className={classes.userInfoWrapper}>
                <Avatar
                    alt={`avatar`}
                    className={classes.avatar}
                    src={location.state.user?.avatar ?? DEFAULT_PROFILE_IMG}
                />
                <div className={classes.info}>
                    <Typography variant={"h6"} component={"div"}>
                        {location.state.user?.fullName}
                    </Typography>
                    <Typography variant={"subtitle1"} component={"div"}>
                        @{location.state.user?.username}
                    </Typography>
                </div>
            </div>
            <Typography variant={"body1"} component={"div"} className={classes.resetPasswordText}>
                Strong passwords include numbers, letters, and punctuation marks.
                <a href={ACCOUNT_SECURITY_TIPS} target={"_blank"}>
                    Learn more
                </a>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant={"h6"} component={"div"} className={classes.enterPasswordText}>
                    Enter your new password
                </Typography>
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <ForgotPasswordTextField
                            id="password"
                            name="password"
                            type="password"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                            error={!!errors.password}
                            autoFocus
                        />
                    )}
                />
                <Typography component={"span"} className={classes.errorMessage}>
                    {errors.password?.message}
                </Typography>
                <Typography variant={"h6"} component={"div"} className={classes.enterPasswordText}>
                    Enter your password one more time
                </Typography>
                <Controller
                    name="password2"
                    control={control}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <ForgotPasswordTextField
                            id="password2"
                            name="password2"
                            type="password"
                            variant="outlined"
                            value={value}
                            onChange={onChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                            error={!!errors.password2}
                            autoFocus
                        />
                    )}
                />
                <Typography component={"span"} className={classes.errorMessage}>
                    {errors.password2?.message}
                </Typography>
                <div className={classes.checkbox}>
                    <Checkbox
                        checked
                        name="checkedB"
                        color="primary"
                    />
                    <Typography variant={"body1"} component={"span"}>
                        Remember me
                    </Typography>
                </div>
                <Typography variant={"body1"} component={"div"} className={classes.text}>
                    Resetting your password will log you out of all your active Twitter sessions.
                </Typography>
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Reset password
                </Button>
            </form>
        </>
    );
};

export default ResetPassword;
