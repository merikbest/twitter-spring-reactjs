import React, {ChangeEvent, FC, FormEvent, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {History, LocationState} from "history";
import {Link, useHistory} from "react-router-dom";
import {Button, Typography} from "@material-ui/core";
import TwitterIcon from "@material-ui/icons/Twitter";

import {LoginTextField} from "./LoginInputField";
import {useLoginStyles} from "./LoginStyles";
import {selectUserStatus} from "../../store/ducks/user/selectors";
import {fetchSignIn} from "../../store/ducks/user/actionCreators";
import {LoadingStatus} from "../../store/types";

export interface LoginProps {
    email: string;
    password: string;
    history: History<LocationState>;
}

const Login: FC = (): ReactElement => {
    const classes = useLoginStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const errorStatus = useSelector(selectUserStatus);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const onSubmit = (event: FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        dispatch(fetchSignIn({email, password, history}));
    };

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget) {
            setEmail(event.currentTarget.value);
        }
    };

    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>): void => {
        if (event.currentTarget) {
            setPassword(event.currentTarget.value);
        }
    };

    return (
        <div className={classes.container}>
            <div>
                <TwitterIcon/>
            </div>
            <h1>Log in to Twitter</h1>
            {(errorStatus === LoadingStatus.ERROR) && (
                <Typography component={"div"} className={classes.error}>
                    The username and password you entered did not match our records.
                    Please double-check and try again.
                </Typography>
            )}
            <form onSubmit={onSubmit}>
                <div className={classes.input}>
                    <LoginTextField
                        label="Phone, email or username"
                        type="email"
                        variant="filled"
                        onChange={handleChangeEmail}
                        value={email}
                    />
                </div>
                <div className={classes.input}>
                    <LoginTextField
                        label="Password"
                        type="password"
                        variant="filled"
                        onChange={handleChangePassword}
                        value={password}
                    />
                </div>
                <Button
                    className={classes.button}
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={!(email && password)}
                    fullWidth
                >
                    Login
                </Button>
            </form>
            <div className={classes.footer}>
                <Typography component={"span"}><Link to={"/account/forgot"}>Forgot password?</Link></Typography> ·
                <Typography component={"span"}><Link to={"/account/signin"}> Sign up for Twitter</Link></Typography>
            </div>
        </div>
    );
};

export default Login;
