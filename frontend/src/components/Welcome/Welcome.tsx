import React, { FC, ReactElement } from "react";
import { useDispatch } from "react-redux";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";

import { useWelcomeStyles } from "./WelcomeStyles";
import { startUseTwitter } from "../../store/ducks/user/actionCreators";

const Welcome: FC = (): ReactElement => {
    const classes = useWelcomeStyles();
    const dispatch = useDispatch();

    const onHandleClick = () => {
        dispatch(startUseTwitter());
    };

    return (
        <div className={classes.info}>
            <Typography variant={"h5"} component={"div"}>
                Welcome to Twitter!
            </Typography>
            <Typography variant={"subtitle1"} component={"div"}>
                This is the best place to see what’s happening in your world.
                Find some people and topics to follow now.
            </Typography>
            <div className={classes.infoButtonContainer}>
                <Button
                    onClick={onHandleClick}
                    color="primary"
                    variant="contained"
                    size="small"
                >
                    Let's go
                </Button>
            </div>
        </div>
    );
};

export default Welcome;
