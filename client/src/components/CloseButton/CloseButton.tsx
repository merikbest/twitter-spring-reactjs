import React, {FC, ReactElement} from 'react';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import {useCloseButtonStyles} from "./CloseButtonStyles";
import HoverAction from "../HoverAction/HoverAction";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";

interface CloseButtonProps {
    onClose: () => void;
}

const CloseButton: FC<CloseButtonProps & HoverActionProps> = (
    {
        onClose,
        visibleHoverAction,
        handleHoverAction,
        handleLeaveAction
    }
): ReactElement => {
    const classes = useCloseButtonStyles();

    return (
        <div className={classes.close}>
            <IconButton
                onClick={onClose}
                onMouseEnter={() => handleHoverAction?.(HoverActions.OTHER)}
                onMouseLeave={handleLeaveAction}
                color="secondary"
                aria-label="close"
            >
                <CloseIcon style={{fontSize: 26}} color="primary"/>
                <HoverAction visible={visibleHoverAction?.visibleOtherAction} actionText={"Close"}/>
            </IconButton>
        </div>
    );
};

export default withHoverAction(CloseButton);
