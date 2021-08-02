import React, {FC, FormEvent, ReactElement} from 'react';
import {ForgotPasswordTextField} from "../ForgotPasswordTextField/ForgotPasswordTextField";
import {Button} from "@material-ui/core";
import {useForgotPasswordStyles} from "../ForgotPasswordStyles";

interface FindEmailErrorProps {
    classes: ReturnType<typeof useForgotPasswordStyles>;
    error: boolean;
    email: string;
    setEmail: (value: string | ((prevVar: string) => string)) => void;
    findExistingEmail: (event: FormEvent<HTMLFormElement>) => void;
}

const FindEmailError: FC<FindEmailErrorProps> = ({
                                                     classes,
                                                     error,
                                                     email,
                                                     setEmail,
                                                     findExistingEmail
                                                 }): ReactElement => {

    return (
        <>
            <h1 className={classes.warning}>We couldn't find your account with that information</h1>
            <p>Please try searching for your email, phone number or username again.</p>
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

export default FindEmailError;
