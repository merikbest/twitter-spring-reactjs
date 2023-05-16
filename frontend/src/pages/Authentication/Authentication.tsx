import React, { FC, ReactElement, useState } from "react";
import { useHistory } from "react-router-dom";
import TwitterIcon from "@material-ui/icons/Twitter";
import { Button, List, ListItem, Typography } from "@material-ui/core";

import { useAuthenticationStyles } from "./AuthenticationStyles";
import { CommunityIcon, ReplyIcon, SearchIcon } from "../../icons";
import RegistrationModal from "./RegistrationModal/RegistrationModal";
import CustomizeModal from "./CustomizeModal/CustomizeModal";
import CreateAccountModal from "./CreateAccountModal/CreateAccountModal";
import EmailVerificationModal from "./EmailVerificationModal/EmailVerificationModal";
import SetPasswordModal from "./SetPasswordModal/SetPasswordModal";
import { ACCOUNT_LOGIN } from "../../constants/path-constants";
import { RegistrationRequest } from "../../types/auth";

const Authentication: FC = (): ReactElement => {
    const classes = useAuthenticationStyles();
    const history = useHistory();
    const [registrationInfo, setRegistrationInfo] = useState<RegistrationRequest>({
        username: "", email: "", birthday: ""
    });
    const [visibleRegistrationModal, setVisibleRegistrationModal] = useState<boolean>(false);
    const [visibleCustomizeModal, setVisibleCustomizeModal] = useState<boolean>(false);
    const [visibleCreteAccountModal, setVisibleCreteAccountModal] = useState<boolean>(false);
    const [visibleEmailVerificationModal, setVisibleEmailVerificationModal] = useState<boolean>(false);
    const [visibleSetPasswordModal, setVisibleSetPasswordModal] = useState<boolean>(false);

    const handleClickOpenSignIn = (): void => {
        history.push(ACCOUNT_LOGIN);
    };

    const handleClickOpenSignUp = (): void => {
        setVisibleRegistrationModal(true);
    };

    const onOpenCustomizeModal = (): void => {
        setVisibleCustomizeModal(true);
    };

    const onOpenCreteAccountModal = (): void => {
        setVisibleCreteAccountModal(true);
    };

    const onOpenEmailVerificationModal = (): void => {
        setVisibleEmailVerificationModal(true);
    };

    const onOpenSetPasswordModal = (): void => {
        setVisibleSetPasswordModal(true);
    };

    const handleCloseModal = (): void => {
        setVisibleRegistrationModal(false);
        setVisibleCustomizeModal(false);
        setVisibleCreteAccountModal(false);
        setVisibleEmailVerificationModal(false);
        setVisibleSetPasswordModal(false);
    };

    const onChangeRegistrationInfo = (data: RegistrationRequest): void => {
        setRegistrationInfo(data);
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
                    <RegistrationModal
                        isOpen={visibleRegistrationModal}
                        onClose={handleCloseModal}
                        onOpenCustomize={onOpenCustomizeModal}
                        onChangeRegistrationInfo={onChangeRegistrationInfo}
                    />
                    <CustomizeModal
                        isOpen={visibleCustomizeModal}
                        onClose={handleCloseModal}
                        onOpenCreateAccount={onOpenCreteAccountModal}
                    />
                    <CreateAccountModal
                        isOpen={visibleCreteAccountModal}
                        onClose={handleCloseModal}
                        registrationInfo={registrationInfo}
                        onOpenEmailVerification={onOpenEmailVerificationModal}
                    />
                    <EmailVerificationModal
                        email={registrationInfo.email}
                        isOpen={visibleEmailVerificationModal}
                        onClose={handleCloseModal}
                        onOpenSetPassword={onOpenSetPasswordModal}
                    />
                    <SetPasswordModal
                        email={registrationInfo.email}
                        isOpen={visibleSetPasswordModal}
                        onClose={handleCloseModal}
                    />
                </div>
            </section>
        </div>
    );
};

export default Authentication;
