import React, {FC, ReactElement, useState} from 'react';
import {Route} from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";

import {useForgotPasswordStyles} from "./ForgotPasswordStyles";
import CheckEmailCode from "./CheckEmailCode/CheckEmailCode";
import FindEmail from "./FindEmail/FindEmail";
import ResetPasswordOption from "./ResetPasswordOption/ResetPasswordOption";
import ResetPassword from "./ResetPassword/ResetPassword";
import {User} from "../../store/ducks/user/contracts/state";
import ResetPasswordSuccess from "./ResetPasswordSuccess/ResetPasswordSuccess";

const ForgotPassword: FC = (): ReactElement => {
    const classes = useForgotPasswordStyles();
    const [email, setEmail] = useState<string>("");
    const [user, setUser] = useState<User | undefined>();

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <div className={classes.headerWrapper}>
                    <span style={{marginTop: 10}}><TwitterIcon/></span>
                    <p>Password Reset</p>
                </div>
            </div>
            <div className={classes.content}>
                <Route exact path="/account/forgot" component={() => <FindEmail email={email} setEmail={setEmail}/>}/>
                <Route exact path="/account/forgot/send_password_reset" component={() => <ResetPasswordOption email={email}/>}/>
                <Route exact path="/account/forgot/confirm_pin_reset" component={() => <CheckEmailCode setUser={setUser}/>}/>
                <Route exact path="/account/forgot/reset_password" component={() => <ResetPassword user={user}/>}/>
                <Route exact path="/account/forgot/password_reset_complete" component={ResetPasswordSuccess}/>
            </div>
        </div>
    );
};

export default ForgotPassword;
