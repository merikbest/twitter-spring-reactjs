import React, {FC, ReactElement, useState} from 'react';
import {useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {useBackButtonStyles} from "./BackButtonStyles";
import HoverAction from "../HoverAction/HoverAction";

export const BackButton: FC = (): ReactElement => {
    const classes = useBackButtonStyles();
    const history = useHistory();
    const [visibleBackAction, setVisibleBackAction] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);

    const handleClickButton = (): void => {
        history.goBack();
    };

    const handleHoverAction = (): void => {
        setDelayHandler(setTimeout(() => setVisibleBackAction(true), 500));
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleBackAction(false);
    };

    return (
        <div className={classes.container}>
            <IconButton
                onClick={handleClickButton}
                onMouseEnter={handleHoverAction}
                onMouseLeave={handleLeaveAction}
                color="primary"
            >
                <ArrowBackIcon/>
                <HoverAction visible={visibleBackAction} actionText={"Back"}/>
            </IconButton>
        </div>
    );
};
