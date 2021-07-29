import React from 'react';
import {useForgotPasswordStyles} from "../ForgotPasswordStyles";
import {ForgotPasswordTextField} from "../ForgotPasswordTextField/ForgotPasswordTextField";
import {Button, Checkbox} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import Typography from "@material-ui/core/Typography";

const ResetPassword = () => {
    const classes = useForgotPasswordStyles();

    return (
        <>
            <h1>Reset your password</h1>
            <div style={{display: "flex"}}>
                <Avatar
                    alt={`avatar`}
                    className={classes.avatar}
                    // src={myProfile?.user.avatar?.src ? myProfile?.user.avatar?.src : DEFAULT_PROFILE_IMG}
                    src={DEFAULT_PROFILE_IMG}
                />
                <div className={classes.info}>
                    <b>miroslav</b>
                    <Typography>@mirosla28448210</Typography>
                </div>
            </div>
            <p>Strong passwords include numbers, letters, and punctuation marks.
                <span className={classes.more}>Learn more</span>
            </p>
            <form >
                <div><b>Enter your new password</b></div>
                <ForgotPasswordTextField
                    // error={error}
                    variant="outlined"
                    // onChange={(event) => setResetCode(event.target.value)}
                    // value={resetCode}
                />
                <div style={{marginTop: 10}}><b>Enter your password one more time</b></div>
                <ForgotPasswordTextField
                    // error={error}
                    variant="outlined"
                    // onChange={(event) => setResetCode(event.target.value)}
                    // value={resetCode}
                />
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
