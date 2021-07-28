import React, {FC, FormEvent} from 'react';
import {Button, Radio} from "@material-ui/core";
import {Link} from 'react-router-dom';

import {useForgotPasswordStyles} from "../ForgotPasswordStyles";

interface ResetPasswordOptionProps {
    email: string;
    sendResetCode: (event: FormEvent<HTMLFormElement>) => void;
}

const ResetPasswordOption: FC<ResetPasswordOptionProps> = ({email, sendResetCode}) => {
    const classes = useForgotPasswordStyles();

    return (
        <>
            <h1>How do you want to reset your password?</h1>
            <p>You can use the information associated with your account.</p>
            <form style={{margin: "32px 0 16px 0",}} onSubmit={sendResetCode}>
                <div className={classes.emailWrapper}>
                    <Radio className={classes.radio} checked={true} color="primary" />
                    <span className={classes.email}>Send an email to <b>{email}</b></span>
                </div>
                <Link to={"/account/forgot/confirm_pin_reset"}>
                    <Button
                        className={classes.button}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Next
                    </Button>
                </Link>
            </form>
            <p className={classes.link}>Don’t have access to these?</p>
        </>
    );
};

export default ResetPasswordOption;
