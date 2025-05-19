import React, { FC, ReactElement } from "react";
import { Button, Typography } from "@material-ui/core";

import { useFindEmailStyles } from "./FindEmailStyles";
import { ForgotPasswordTextField } from "../ForgotPasswordTextField";
import { useFindEmail } from "./useFindEmail";

const FindEmail: FC = (): ReactElement => {
    const classes = useFindEmailStyles();
    const { email, error, findExistingEmail, handleChangeEmail } = useFindEmail();

    return (
        <>
            {error ? (
                <>
                    <Typography component="div" className={classes.warning}>
                        We couldn't find your account with that information
                    </Typography>
                    <Typography variant="body1" component="div" className={classes.text}>
                        Please try searching for your email, phone number or username again.
                    </Typography>
                </>
            ) : (
                <>
                    <Typography variant="h3" component="div">
                        Find your Twitter account
                    </Typography>
                    <Typography variant="body1" component="div" className={classes.text}>
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
