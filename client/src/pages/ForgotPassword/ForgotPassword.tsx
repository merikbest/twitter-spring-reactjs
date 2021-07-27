import React, {FormEvent, useState} from 'react';
import TwitterIcon from "@material-ui/icons/Twitter";
import {Button} from "@material-ui/core";

import {useForgotPasswordStyles} from "./ForgotPasswordStyles";
import {ForgotPasswordTextField} from "./ForgotPasswordTextField/ForgotPasswordTextField";
import {UserApi} from "../../services/api/userApi";

const ForgotPassword = () => {
    const classes = useForgotPasswordStyles();
    const [email, setEmail] = useState<string>("");

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // UserApi.getUsers().then((data) => {
        //     setUsers(data);
        // });
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.headerWrapper}>
                    <span style={{marginTop: 10}}><TwitterIcon/></span>
                    <p>Password Reset</p>
                </div>
            </div>
            <div className={classes.content}>
                <h1>Find your Twitter account</h1>
                <h1 className={classes.warning}>We couldn't find your account with that information</h1>
                <p>Enter your email, phone number, or username.</p>
                <p>Please try searching for your email, phone number or username again.</p>
                <form onSubmit={onSubmit}>
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
            </div>
        </div>
    );
};

export default ForgotPassword;
