import React, {ChangeEvent, FC, FormEvent, ReactElement, useState} from 'react';
import {useHistory} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";

import {useFindEmailStyles} from "./FindEmailStyles";
import {ForgotPasswordTextField} from "../ForgotPasswordTextField/ForgotPasswordTextField";
import {AuthApi} from "../../../services/api/authApi";

const FindEmail: FC = (): ReactElement => {
    const classes = useFindEmailStyles();
    const history = useHistory();
    const [error, setError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const findExistingEmail = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        AuthApi.findExistingEmail({email})
            .then(() => {
                setError(false);
                history.push({pathname: "/account/forgot/send_password_reset", state: {email: email}});
            })
            .catch(() => setError(true));
    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget) {
            setEmail(event.currentTarget.value);
        }
    };

    return (
        <>
            {error ? (
                <>
                    <Typography component={"h1"} className={classes.warning}>
                        We couldn't find your account with that information
                    </Typography>
                    <Typography component={"div"} className={classes.text}>
                        Please try searching for your email, phone number or username again.
                    </Typography>
                </>
            ) : (
                <>
                    <Typography component={"h1"}>
                        Find your Twitter account
                    </Typography>
                    <Typography component={"div"} className={classes.text}>
                        Enter your email, phone number, or username.
                    </Typography>
                </>
            )}
            <form onSubmit={findExistingEmail}>
                <ForgotPasswordTextField
                    variant="outlined"
                    onChange={handleChangeEmail}
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
