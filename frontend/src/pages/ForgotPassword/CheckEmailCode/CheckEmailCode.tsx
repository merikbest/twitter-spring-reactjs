import React, { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Link as MuiLink, Typography } from "@material-ui/core";

import { ForgotPasswordTextField } from "../ForgotPasswordTextField/ForgotPasswordTextField";
import { useCheckEmailCodeStyles } from "./CheckEmailCodeStyles";
import { ACCOUNT_FORGOT_RESET_PASSWORD } from "../../../constants/path-constants";
import { REGAIN_ACCESS } from "../../../constants/url-constants";
import { AuthenticationApi } from "../../../services/api/user-service/authenticationApi";

const CheckEmailCode: FC = (): ReactElement => {
    const classes = useCheckEmailCodeStyles();
    const history = useHistory();
    const [resetCode, setResetCode] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const verifyResetCode = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (!resetCode) {
            setError(true);
        } else {
            AuthenticationApi.getUserByPasswordResetCode(resetCode)
                .then((response) => {
                    history.push({ pathname: ACCOUNT_FORGOT_RESET_PASSWORD, state: { user: response.data } });
                })
                .catch(() => setError(true));
        }
    };

    const handleChangeResetCode = (event: ChangeEvent<HTMLInputElement>): void => {
        setResetCode(event.target.value);
    };

    return (
        <>
            <Typography variant={"h3"} component={"div"}>
                Check your email
            </Typography>
            <Typography variant={"body1"} component={"div"} className={classes.text}>
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
                    <Typography component={"div"} className={classes.errorMessage}>
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
                <Typography variant={"body1"} component={"div"} className={classes.footerText}>
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
