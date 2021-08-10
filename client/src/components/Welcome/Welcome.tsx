import React, {FC, ReactElement} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";

import {useWelcomeStyles} from "./WelcomeStyles";
import {selectUserData} from "../../store/ducks/user/selectors";
import {startUseTwitter} from "../../store/ducks/user/actionCreators";

const Welcome: FC = (): ReactElement => {
    const classes = useWelcomeStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);

    const onHandleClick = () => {
        dispatch(startUseTwitter(myProfile?.id!));
    };

    return (
        <div className={classes.info}>
            <div className={classes.infoTitle}>Welcome to Twitter!</div>
            <div className={classes.infoText}>
                This is the best place to see what’s happening in your world.
                Find some people and topics to follow now.
            </div>
            <div className={classes.infoButtonContainer}>
                <Button
                    className={classes.infoButton}
                    onClick={onHandleClick}
                    color="primary"
                    variant="contained"
                >
                    Let's go
                </Button>
            </div>
        </div>
    );
};

export default Welcome;
