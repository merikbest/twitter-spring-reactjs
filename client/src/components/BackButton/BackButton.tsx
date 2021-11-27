import React, {FC, ReactElement} from 'react';
import {useHistory} from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import {useBackButtonStyles} from "./BackButtonStyles";
import HoverAction from "../HoverAction/HoverAction";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";

const BackButton: FC<HoverActionProps> = ({visibleHoverAction, handleHoverAction, handleLeaveAction}): ReactElement => {
    const classes = useBackButtonStyles();
    const history = useHistory();

    const handleClickButton = (): void => {
        history.goBack();
    };

    return (
        <div className={classes.container}>
            <IconButton
                onClick={handleClickButton}
                onMouseEnter={() => handleHoverAction?.(HoverActions.OTHER)}
                onMouseLeave={handleLeaveAction!}
                color="primary"
            >
                <ArrowBackIcon/>
                <HoverAction visible={visibleHoverAction?.visibleOtherAction} actionText={"Back"}/>
            </IconButton>
        </div>
    );
};

export default withHoverAction(BackButton);
