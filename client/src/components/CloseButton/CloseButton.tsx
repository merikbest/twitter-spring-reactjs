import React, {FC, ReactElement} from 'react';
import IconButton from "@material-ui/core/IconButton";

import {useCloseButtonStyles} from "./CloseButtonStyles";
import HoverAction from "../HoverAction/HoverAction";
import {HoverActionProps, HoverActions, withHoverAction} from "../../hoc/withHoverAction";
import {CloseIcon} from "../../icons";

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
                color="primary"
                aria-label="close"
            >
                <>{CloseIcon}</>
                <HoverAction visible={visibleHoverAction?.visibleOtherAction} actionText={"Close"}/>
            </IconButton>
        </div>
    );
};

export default withHoverAction(CloseButton);
