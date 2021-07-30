import React, {FC, FormEvent} from 'react';
import {Button, Radio} from "@material-ui/core";

import {useForgotPasswordStyles} from "../ForgotPasswordStyles";
import {AuthApi} from "../../../services/api/authApi";
import {useHistory} from "react-router-dom";

interface ResetPasswordOptionProps {
    email: string;
}

const ResetPasswordOption: FC<ResetPasswordOptionProps> = ({email}) => {
    const classes = useForgotPasswordStyles();
    const history = useHistory();

    const sendResetCode = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        AuthApi.sendPasswordResetCode({email})
            .then(() => history.push("/account/forgot/confirm_pin_reset"));
    };

    return (
        <>
            <h1>How do you want to reset your password?</h1>
            <p>You can use the information associated with your account.</p>
            <form style={{margin: "32px 0 16px 0",}} onSubmit={sendResetCode}>
                <div className={classes.emailWrapper}>
                    <Radio className={classes.radio} checked={true} color="primary"/>
                    <span className={classes.email}>Send an email to <b>{email}</b></span>
                </div>
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                >
                    Next
                </Button>
            </form>
            <p className={classes.link}>Don’t have access to these?</p>
        </>
    );
};

export default ResetPasswordOption;
