import React, {FC, ReactElement, useState} from 'react';
import {useHistory} from "react-router-dom";
import TwitterIcon from '@material-ui/icons/Twitter';
import {Button, List, ListItem, Typography} from '@material-ui/core';

import {useAuthenticationStyles} from "./AuthenticationStyles";
import {CommunityIcon, ReplyIcon, SearchIcon} from "../../icons";
import RegistrationModal from "../RegistrationModal/RegistrationModal";
import CustomizeModal from "../RegistrationModal/CustomizeModal/CustomizeModal";
import CreateAccountModal from "../RegistrationModal/CreateAccountModal/CreateAccountModal";
import EmailVerificationModal from "../RegistrationModal/EmailVerificationModal/EmailVerificationModal";
import SetPasswordModal from "../RegistrationModal/SetPasswordModal/SetPasswordModal";

export interface RegistrationInfo {
    username: string;
    email: string;
    birthday: string;
}

const Authentication: FC = (): ReactElement => {
    const classes = useAuthenticationStyles();
    const history = useHistory();
    const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo>({
        username: "", email: "", birthday: "",
    });
    const [visibleRegistrationModal, setVisibleRegistrationModal] = useState<boolean>(false);
    const [visibleCustomizeModal, setVisibleCustomizeModal] = useState<boolean>(false);
    const [visibleCreteAccountModal, setVisibleCreteAccountModal] = useState<boolean>(false);
    const [visibleEmailVerificationModal, setVisibleEmailVerificationModal] = useState<boolean>(false);
    const [visibleSetPasswordModal, setVisibleSetPasswordModal] = useState<boolean>(false);

    const handleClickOpenSignIn = (): void => {
        history.push("/account/login");
    };

    const handleClickOpenSignUp = (): void => {
        setVisibleRegistrationModal(true);
    };

    const handleCloseModal = (): void => {
        setVisibleRegistrationModal(false);
        setVisibleCustomizeModal(false);
        setVisibleCreteAccountModal(false);
        setVisibleEmailVerificationModal(false);
        setVisibleSetPasswordModal(false);
    };

    const onChangeRegistrationInfo = (data: RegistrationInfo): void => {
        setRegistrationInfo(data);
    };

    return (
        <div className={classes.wrapper}>
            <section className={classes.leftSide}>
                <TwitterIcon color="primary" className={classes.leftSideTwitterIcon}/>
                <List className={classes.leftSideListInfo}>
                    <ListItem>
                        <Typography variant="h6">
                            <>{SearchIcon}</> Follow your interests.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h6">
                            <>{CommunityIcon}</> Hear what people are talking about.
                        </Typography>
                    </ListItem>
                    <ListItem>
                        <Typography variant="h6">
                            <>{ReplyIcon}</> Join the conversation.
                        </Typography>
                    </ListItem>
                </List>
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
                    <RegistrationModal
                        open={visibleRegistrationModal}
                        onClose={handleCloseModal}
                        onOpenCustomize={setVisibleCustomizeModal}
                        onChangeRegistrationInfo={onChangeRegistrationInfo}
                    />
                    <CustomizeModal
                        open={visibleCustomizeModal}
                        onClose={handleCloseModal}
                        onOpenCreateAccount={setVisibleCreteAccountModal}
                    />
                    <CreateAccountModal
                        open={visibleCreteAccountModal}
                        onClose={handleCloseModal}
                        registrationInfo={registrationInfo}
                        onOpenEmailVerification={setVisibleEmailVerificationModal}
                    />
                    <EmailVerificationModal
                        email={registrationInfo.email}
                        open={visibleEmailVerificationModal}
                        onClose={handleCloseModal}
                        onOpenSetPassword={setVisibleSetPasswordModal}
                    />
                    <SetPasswordModal
                        email={registrationInfo.email}
                        open={visibleSetPasswordModal}
                        onClose={handleCloseModal}
                    />
                </div>
            </section>
        </div>
    );
};

export default Authentication;
