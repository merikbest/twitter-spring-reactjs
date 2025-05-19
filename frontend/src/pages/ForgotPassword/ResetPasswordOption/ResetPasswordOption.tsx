import React, { FC, ReactElement } from "react";
import { Button, Link as MuiLink, Radio, Typography } from "@material-ui/core";

import { useResetPasswordOptionStyles } from "./ResetPasswordOptionStyles";
import { REGAIN_ACCESS } from "../../../constants/url-constants";
import { useResetPasswordOption } from "./useResetPasswordOption";

const ResetPasswordOption: FC = (): ReactElement => {
    const classes = useResetPasswordOptionStyles();
    const { email, isLoading, sendResetCode } = useResetPasswordOption();

    return (
        <>
            <Typography variant="h3" component="div">
                How do you want to reset your password?
            </Typography>
            <Typography variant="body1" component="div" className={classes.text}>
                You can use the information associated with your account.
            </Typography>
            <form className={classes.formWrapper} onSubmit={sendResetCode}>
                <div className={classes.emailWrapper}>
                    <Radio className={classes.radio} checked color="primary" />
                    <Typography variant="body1" component="span">
                        {"Send an email to "}
                    </Typography>
                    <Typography variant="h6" component="span">
                        {email}
                    </Typography>
                </div>
                <Button
                    className={classes.button}
                    disabled={isLoading}
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="small"
                >
                    Next
                </Button>
            </form>
            <MuiLink href={REGAIN_ACCESS} variant="subtitle2" target="_blank" rel="noopener">
                Don’t have access to these?
            </MuiLink>
        </>
    );
};

export default ResetPasswordOption;
