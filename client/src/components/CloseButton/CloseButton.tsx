import React, {FC, ReactElement, useState} from 'react';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";

import {useCloseButtonStyles} from "./CloseButtonStyles";
import HoverAction from "../HoverAction/HoverAction";

interface CloseButtonProps {
    onClose: () => void;
}

const CloseButton: FC<CloseButtonProps> = ({onClose}): ReactElement => {
    const classes = useCloseButtonStyles();
    const [visibleCloseAction, setVisibleCloseAction] = useState<boolean>(false);
    const [delayHandler, setDelayHandler] = useState<any>(null);

    const handleHoverAction = (): void => {
        setDelayHandler(setTimeout(() => setVisibleCloseAction(true), 500));
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleCloseAction(false);
    };

    return (
        <div className={classes.close}>
            <IconButton
                onClick={onClose}
                onMouseEnter={handleHoverAction}
                onMouseLeave={handleLeaveAction}
                color="secondary"
                aria-label="close"
            >
                <CloseIcon style={{fontSize: 26}} color="secondary"/>
                <HoverAction visible={visibleCloseAction} actionText={"Close"}/>
            </IconButton>
        </div>
    );
};

export default CloseButton;
