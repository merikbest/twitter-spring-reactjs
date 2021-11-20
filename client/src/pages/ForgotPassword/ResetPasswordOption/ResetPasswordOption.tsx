import React, {FC, FormEvent, ReactElement, useState} from 'react';
import {useHistory, useLocation} from "react-router-dom";
import {Button, Radio, Typography} from "@material-ui/core";

import {AuthApi} from "../../../services/api/authApi";
import {useResetPasswordOptionStyles} from "./ResetPasswordOptionStyles";

const ResetPasswordOption: FC = (): ReactElement => {
    const classes = useResetPasswordOptionStyles();
    const history = useHistory();
    const location = useLocation<{ email: string }>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const sendResetCode = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setIsLoading(true);
        AuthApi.sendPasswordResetCode({email: location.state.email})
            .then(() => {
                history.push("/account/forgot/confirm_pin_reset");
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    };

    return (
        <>
            <Typography component={"h1"}>
                How do you want to reset your password?
            </Typography>
            <Typography component={"div"} className={classes.text}>
                You can use the information associated with your account.
            </Typography>
            <form className={classes.formWrapper} onSubmit={sendResetCode}>
                <div className={classes.emailWrapper}>
                    <Radio className={classes.radio} checked={true} color="primary"/>
                    <Typography component={"span"} className={classes.email}>
                        Send an email to <b>{location.state.email}</b>
                    </Typography>
                </div>
                <Button
                    className={classes.button}
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Next
                </Button>
            </form>
            <Typography className={classes.link}>
                Don’t have access to these?
            </Typography>
        </>
    );
};

export default ResetPasswordOption;
