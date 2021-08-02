import React, {FC, FormEvent, ReactElement, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button} from "@material-ui/core";

import {ForgotPasswordTextField} from "../ForgotPasswordTextField/ForgotPasswordTextField";
import {useForgotPasswordStyles} from "../ForgotPasswordStyles";
import {AuthApi} from "../../../services/api/authApi";
import {User} from "../../../store/ducks/user/contracts/state";

interface CheckEmailCodeProps {
    setUser: (value: User | undefined | ((prevVar: User | undefined) => User | undefined)) => void;
}

const CheckEmailCode: FC<CheckEmailCodeProps> = ({setUser}): ReactElement => {
    const classes = useForgotPasswordStyles();
    const history = useHistory();
    const [resetCode, setResetCode] = useState<string>("");
    const [error, setError] = useState<boolean>(false);

    const verifyResetCode = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (resetCode === "") {
            setError(true);
        } else {
            AuthApi.getUserByResetCode(resetCode)
                .then((data) => {
                    setUser(data);
                    history.push("/account/forgot/reset_password");
                })
                .catch(() => setError(true));
        }
    };

    return (
        <>
            <h1>Check your email</h1>
            <p>You'll receive a code to verify here so you can reset your account password.</p>
            <form onSubmit={verifyResetCode}>
                <ForgotPasswordTextField
                    error={error}
                    placeholder="Enter your code"
                    variant="outlined"
                    onChange={(event) => setResetCode(event.target.value)}
                    value={resetCode}
                />
                {error && <div className={classes.errorMessage}>Incorrect code. Please try again.</div>}
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Verify
                </Button>
            </form>
            <div>
                <p className={classes.footerText}>
                    If you don't see the email, check other places it might be, like your junk, spam, social,
                    or other folders.
                </p>
                <p className={classes.link}>Didn’t receive your code?</p>
            </div>
        </>
    );
};

export default CheckEmailCode;
