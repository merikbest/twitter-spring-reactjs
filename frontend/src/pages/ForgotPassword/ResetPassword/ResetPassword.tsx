import React, { FC, ReactElement } from "react";
import { Controller } from "react-hook-form";
import { Button, Checkbox } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";

import { ForgotPasswordTextField } from "../ForgotPasswordTextField";
import { ACCOUNT_SECURITY_TIPS, DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { useResetPasswordStyles } from "./ResetPasswordStyles";
import { useResetPassword } from "./useResetPassword";

const ResetPassword: FC = (): ReactElement => {
    const classes = useResetPasswordStyles();
    const { control, handleSubmit, errors, onSubmit, user } = useResetPassword();

    return (
        <>
            <Typography component="div" className={classes.title}>
                Reset your password
            </Typography>
            <div className={classes.userInfoWrapper}>
                <Avatar
                    alt={"avatar"}
                    className={classes.avatar}
                    src={user?.avatar ?? DEFAULT_PROFILE_IMG}
                />
                <div className={classes.info}>
                    <Typography variant="h6" component="div">
                        {user?.fullName}
                    </Typography>
                    <Typography variant="subtitle1" component="div">
                        @{user?.username}
                    </Typography>
                </div>
            </div>
            <Typography variant="body1" component="div" className={classes.resetPasswordText}>
                Strong passwords include numbers, letters, and punctuation marks.
                <a href={ACCOUNT_SECURITY_TIPS} target="_blank">
                    Learn more
                </a>
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h6" component="div" className={classes.enterPasswordText}>
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
                <Typography component="span" className={classes.errorMessage}>
                    {errors.password?.message}
                </Typography>
                <Typography variant="h6" component="div" className={classes.enterPasswordText}>
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
                <Typography component="span" className={classes.errorMessage}>
                    {errors.password2?.message}
                </Typography>
                <div className={classes.checkbox}>
                    <Checkbox checked name="checkedB" color="primary" />
                    <Typography variant="body1" component="span">
                        Remember me
                    </Typography>
                </div>
                <Typography variant="body1" component="div" className={classes.text}>
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
