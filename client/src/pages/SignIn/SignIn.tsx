import React, {FC, ReactElement} from 'react';
import TwitterIcon from '@material-ui/icons/Twitter';
import SearchIcon from '@material-ui/icons/Search';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import ChatIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import {Button, makeStyles, Typography} from '@material-ui/core';

import LoginModal from './LoginModal';
import RegisterModal from "./RegisterModal";
import {useStylesSignIn} from "./SignInStyles";

const SignIn: FC = (): ReactElement => {
    const classes = useStylesSignIn();
    const [visibleModal, setVisibleModal] = React.useState<"signIn" | "signUp">();

    const handleClickOpenSignIn = (): void => {
        setVisibleModal("signIn");
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
                            <SearchIcon className={classes.leftSideIcon}/>
                            Читайте о том, что вам интересно.
                        </Typography>
                    </li>
                    <li className={classes.leftSideListInfoItem}>
                        <Typography variant="h6">
                            <PeopleOutlineIcon className={classes.leftSideIcon}/>
                            Узнавайте, о чем говорят в мире.
                        </Typography>
                    </li>
                    <li className={classes.leftSideListInfoItem}>
                        <Typography variant="h6">
                            <ChatIcon className={classes.leftSideIcon}/>
                            Присоеденяйтесь к общению.
                        </Typography>
                    </li>
                </ul>
            </section>
            <section className={classes.rightSide}>
                <div className={classes.rightSideWrapper}>
                    <TwitterIcon color="primary" className={classes.rightSideTwitterIcon}/>
                    <Typography className={classes.rightSideTittle} variant="h4">
                        Узнайте, что происходит в мире прямо сейчас
                    </Typography>
                    <Typography>
                        <b>Присоединяйтесь к Твиттеру прямо сейчас!</b>
                    </Typography>
                    <br/>
                    <Button
                        onClick={handleClickOpenSignUp}
                        style={{marginBottom: "20px"}}
                        variant="contained"
                        color="primary"
                        fullWidth>
                        Зарегистрироваться
                    </Button>
                    <Button
                        onClick={handleClickOpenSignIn}
                        variant="outlined"
                        color="primary"
                        fullWidth>
                        Войти
                    </Button>
                    <LoginModal open={visibleModal === 'signIn'} onClose={handleCloseModal} />
                    <RegisterModal open={visibleModal === 'signUp'} onClose={handleCloseModal} />
                </div>
            </section>
        </div>
    );
};

export default SignIn;
