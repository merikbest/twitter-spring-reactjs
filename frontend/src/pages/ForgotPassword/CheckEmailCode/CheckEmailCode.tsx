import React, { FC, ReactElement } from "react";
import { Button, Link as MuiLink, Typography } from "@material-ui/core";

import { ForgotPasswordTextField } from "../ForgotPasswordTextField";
import { useCheckEmailCodeStyles } from "./CheckEmailCodeStyles";
import { REGAIN_ACCESS } from "../../../constants/url-constants";
import { useCheckEmailCode } from "./useCheckEmailCode";

const CheckEmailCode: FC = (): ReactElement => {
    const classes = useCheckEmailCodeStyles();
    const { resetCode, error, verifyResetCode, handleChangeResetCode } = useCheckEmailCode();

    return (
        <>
            <Typography variant="h3" component="div">
                Check your email
            </Typography>
            <Typography variant="body1" component="div" className={classes.text}>
                You'll receive a code to verify here so you can reset your account password.
            </Typography>
            <form onSubmit={verifyResetCode}>
                <ForgotPasswordTextField
                    error={error}
                    placeholder="Enter your code"
                    variant="outlined"
                    onChange={handleChangeResetCode}
                    value={resetCode}
                />
                {error && (
                    <Typography component="div" className={classes.errorMessage}>
                        Incorrect code. Please try again.
                    </Typography>
                )}
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Verify
                </Button>
            </form>
            <div>
                <Typography variant="body1" component="div" className={classes.footerText}>
                    If you don't see the email, check other places it might be, like your junk, spam, social,
                    or other folders.
                </Typography>
                <MuiLink href={REGAIN_ACCESS} variant="subtitle2" target="_blank" rel="noopener">
                    Didn’t receive your code?
                </MuiLink>
            </div>
        </>
    );
};

export default CheckEmailCode;
