import React, {FC, ReactElement, useState} from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import {Button, Typography} from '@material-ui/core';

import LoginModal from './LoginModal';
import {useStylesSignIn} from "./SignInStyles";
import {CommunityIcon, ReplyIcon, SearchIcon} from "../../icons";
import {useHistory} from "react-router-dom";
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

const SignIn: FC = (): ReactElement => {
    const classes = useStylesSignIn();
    const history = useHistory();
    const [visibleModal, setVisibleModal] = useState<"signIn" | "signUp">();
    const [registrationInfo, setRegistrationInfo] = useState<RegistrationInfo>({
        username: "", email: "", birthday: "",
    });
    const [visibleRegistrationModal, setVisibleRegistrationModal] = useState<boolean>(false);
    const [visibleCustomizeModal, setVisibleCustomizeModal] = useState<boolean>(false);
    const [visibleCreteAccountModal, setVisibleCreteAccountModal] = useState<boolean>(false);
    const [visibleEmailVerificationModal, setVisibleEmailVerificationModal] = useState<boolean>(false);
    const [visibleSetPasswordModal, setVisibleSetPasswordModal] = useState<boolean>(false);

    const handleClickOpenSignIn = (): void => {
        // setVisibleModal("signIn");
        history.push("/account/login");
    };

    const handleClickOpenSignUp = (): void => {
        setVisibleModal("signUp");
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

export default SignIn;
