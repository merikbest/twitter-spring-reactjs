import React, {FC, FormEvent, ReactElement, useState} from 'react';
import {Button} from "@material-ui/core";

import {useForgotPasswordStyles} from "../ForgotPasswordStyles";
import {ForgotPasswordTextField} from "../ForgotPasswordTextField/ForgotPasswordTextField";
import {AuthApi} from "../../../services/api/authApi";
import {useHistory} from "react-router-dom";

interface FindEmailProps {
    email: string;
    setEmail: (value: string | ((prevVar: string) => string)) => void;
}

const FindEmail: FC<FindEmailProps> = ({email ,setEmail}): ReactElement => {
    const classes = useForgotPasswordStyles();
    const history = useHistory();
    const [error, setError] = useState<boolean>(false);

    const findExistingEmail = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        AuthApi.findExistingEmail({email})
            .then(() => {
                setError(false);
                history.push("/account/forgot/send_password_reset");
            })
            .catch(() => setError(true));
    };

    return (
        <>
            {error ? (
                <>
                    <h1 className={classes.warning}>We couldn't find your account with that information</h1>
                    <p>Please try searching for your email, phone number or username again.</p>
                </>
            ) : (
                <>
                    <h1>Find your Twitter account</h1>
                    <p>Enter your email, phone number, or username.</p>
                </>
            )}
            <form onSubmit={findExistingEmail}>
                <ForgotPasswordTextField
                    variant="outlined"
                    onChange={(event) => setEmail(event.target.value)}
                    value={email}
                />
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Search
                </Button>
            </form>
        </>
    );
};

export default FindEmail;
