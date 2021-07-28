import React, {FC, FormEvent} from 'react';
import {Button} from "@material-ui/core";

import {useForgotPasswordStyles} from "../ForgotPasswordStyles";
import {ForgotPasswordTextField} from "../ForgotPasswordTextField/ForgotPasswordTextField";

interface FindEmailProps {
    error: boolean;
    email: string;
    setEmail: (value: string | ((prevVar: string) => string)) => void;
    findExistingEmail: (event: FormEvent<HTMLFormElement>) => void;
}

const FindEmail: FC<FindEmailProps> = ({error, email, setEmail, findExistingEmail}) => {
    const classes = useForgotPasswordStyles();

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
