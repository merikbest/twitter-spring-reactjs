import React, { ChangeEvent, FC, FormEvent, ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Typography } from "@material-ui/core";

import { useFindEmailStyles } from "./FindEmailStyles";
import { ForgotPasswordTextField } from "../ForgotPasswordTextField/ForgotPasswordTextField";
import { ACCOUNT_FORGOT_SEND_PASSWORD_RESET } from "../../../constants/path-constants";
import { AuthenticationApi } from "../../../services/api/user-service/authenticationApi";

const FindEmail: FC = (): ReactElement => {
    const classes = useFindEmailStyles();
    const history = useHistory();
    const [error, setError] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");

    const findExistingEmail = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        AuthenticationApi.getExistingEmail({ email })
            .then(() => {
                setError(false);
                history.push({ pathname: ACCOUNT_FORGOT_SEND_PASSWORD_RESET, state: { email: email } });
            })
            .catch(() => setError(true));
    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        setEmail(event.target.value);
    };

    return (
        <>
            {error ? (
                <>
                    <Typography component={"div"} className={classes.warning}>
                        We couldn't find your account with that information
                    </Typography>
                    <Typography variant={"body1"} component={"div"} className={classes.text}>
                        Please try searching for your email, phone number or username again.
                    </Typography>
                </>
            ) : (
                <>
                    <Typography variant={"h3"} component={"div"}>
                        Find your Twitter account
                    </Typography>
                    <Typography variant={"body1"} component={"div"} className={classes.text}>
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
                    size="small"
                >
                    Search
                </Button>
            </form>
        </>
    );
};

export default FindEmail;
