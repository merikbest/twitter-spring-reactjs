import React, {FC, ReactElement} from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Button, Typography} from '@material-ui/core';

import LoginModal from './LoginModal';
import RegisterModal from "./RegisterModal";
import {useStylesSignIn} from "./SignInStyles";
import {CommunityIcon, ReplyIcon, SearchIcon} from "../../icons";
import {useHistory} from "react-router-dom";

const SignIn: FC = (): ReactElement => {
    const classes = useStylesSignIn();
    const history = useHistory();
    const [visibleModal, setVisibleModal] = React.useState<"signIn" | "signUp">();

    const handleClickOpenSignIn = (): void => {
        // setVisibleModal("signIn");
        history.push("/account/login");
    };

    const handleClickOpenSignUp = (): void => {
        setVisibleModal("signUp");
    };

    const handleCloseModal = (): void => {
        setVisibleModal(undefined);
    };

    return (
        <div className={classes.wrapper}>
            <section className={classes.leftSide}>
                <TwitterIcon color="primary" className={classes.leftSideTwitterIcon}/>
                <ul className={classes.leftSideListInfo}>
                    <li className={classes.leftSideListInfoItem}>
                        <Typography variant="h6">
                            <span>{SearchIcon}</span>
                            Follow your interests.
                        </Typography>
                    </li>
                    <li className={classes.leftSideListInfoItem}>
                        <Typography variant="h6">
                            <span>{CommunityIcon}</span>
                            Hear what people are talking about.
                        </Typography>
                    </li>
                    <li className={classes.leftSideListInfoItem}>
                        <Typography variant="h6">
                            <span>{ReplyIcon}</span>
                            Join the conversation.
                        </Typography>
                    </li>
                </ul>
            </section>
            <section className={classes.rightSide}>
                <div className={classes.rightSideWrapper}>
                    <TwitterIcon color="primary" className={classes.rightSideTwitterIcon}/>
                    <Typography className={classes.rightSideTittle} variant="h4">
                        See what's happening in the world right now
                    </Typography>
                    <Typography>
                        <b>Join Twitter today!</b>
                    </Typography>
                    <br/>
                    <Button
                        className={classes.signinButton}
                        onClick={handleClickOpenSignUp}
                        variant="contained"
                        color="primary"
                        fullWidth
                    >
                        Sign up
                    </Button>
                    <Button
                        className={classes.signinButton}
                        onClick={handleClickOpenSignIn}
                        variant="outlined"
                        color="primary"
                        fullWidth
                    >
                        Log in
                    </Button>
                    <LoginModal open={visibleModal === 'signIn'} onClose={handleCloseModal} />
                    <RegisterModal open={visibleModal === 'signUp'} onClose={handleCloseModal} />
                </div>
            </section>
        </div>
    );
};

export default SignIn;
