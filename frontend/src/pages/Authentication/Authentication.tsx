import React, { FC, ReactElement } from "react";
import { useHistory } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button, List, ListItem, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";

import { useAuthenticationStyles } from "./AuthenticationStyles";
import { CommunityIcon, ReplyIcon, SearchIcon } from "../../icons";
import RegistrationModal from "./RegistrationModal/RegistrationModal";
import CustomizeModal from "./CustomizeModal/CustomizeModal";
import CreateAccountModal from "./CreateAccountModal/CreateAccountModal";
import EmailVerificationModal from "./EmailVerificationModal/EmailVerificationModal";
import SetPasswordModal from "./SetPasswordModal/SetPasswordModal";
import { ACCOUNT_LOGIN } from "../../constants/path-constants";
import { setOpenModal } from "../../store/ducks/authentication/actionCreators";

const Authentication: FC = (): ReactElement => {
    const classes = useAuthenticationStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleClickOpenSignIn = (): void => {
        history.push(ACCOUNT_LOGIN);
    };

    const handleClickOpenSignUp = (): void => {
        dispatch(setOpenModal());
    };

    return (
        <div className={classes.wrapper}>
            <section className={classes.leftSide}>
                <TwitterIcon color="primary" className={classes.leftSideTwitterIcon} />
                <List className={classes.leftSideListInfo}>
                    <ListItem>
                        <Typography variant="h6">
                            <>{SearchIcon}</>
                            Follow your interests.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h6">
                            <>{CommunityIcon}</>
                            Hear what people are talking about.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h6">
                            <>{ReplyIcon}</>
                            Join the conversation.
                        </Typography>
                    </ListItem>
                </List>
            </section>
            <section className={classes.rightSide}>
                <div className={classes.rightSideWrapper}>
                    <TwitterIcon color="primary" className={classes.rightSideTwitterIcon} />
                    <Typography className={classes.rightSideTittle} variant="h4">
                        See what's happening in the world right now
                    </Typography>
                    <Typography>
                        <b>Join Twitter today!</b>
                    </Typography>
                    <br />
                    <Button
                        className={classes.button}
                        onClick={handleClickOpenSignUp}
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Sign up
                    </Button>
                    <Button
                        className={classes.button}
                        onClick={handleClickOpenSignIn}
                        variant="outlined"
                        color="primary"
                        size="large"
                        fullWidth
                    >
                        Log in
                    </Button>
                    <RegistrationModal />
                    <CustomizeModal />
                    <CreateAccountModal />
                    <EmailVerificationModal />
                    <SetPasswordModal />
                </div>
            </section>
        </div>
    );
};

export default Authentication;
