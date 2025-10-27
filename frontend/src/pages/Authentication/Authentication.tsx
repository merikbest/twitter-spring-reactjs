import React, { FC, ReactElement } from "react";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button, List, ListItem, Typography } from "@material-ui/core";

import { useAuthenticationStyles } from "./AuthenticationStyles";
import { CommunityIcon, ReplyIcon, SearchIcon } from "../../icons";
import RegistrationModal from "./RegistrationModal";
import CustomizeModal from "./CustomizeModal";
import CreateAccountModal from "./CreateAccountModal";
import EmailVerificationModal from "./EmailVerificationModal";
import SetPasswordModal from "./SetPasswordModal";
import { useAuthentication } from "./useAuthentication";

const Authentication: FC = (): ReactElement => {
    const classes = useAuthenticationStyles();
    const { handleClickOpenSignIn, handleClickOpenSignUp } = useAuthentication();

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
