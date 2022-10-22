import React, {FC, ReactElement, useState} from "react";
import {IconButton} from "@material-ui/core";

import HoverAction from "../HoverAction/HoverAction";
import {useActionIconButtonStyles} from "./ActionIconButtonStyles";

const HOVER_DELAY = 500;

interface ActionIconButtonProps {
    onClick?: any;
    actionText: string;
    icon: JSX.Element;
    size?: "medium" | "small";
}

const ActionIconButton: FC<ActionIconButtonProps> = ({onClick, actionText, icon, size = "small"}): ReactElement => {
    const classes = useActionIconButtonStyles();
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const [visibleHoverAction, setVisibleHoverAction] = useState(false);

    const handleHoverAction = (): void => {
        setDelayHandler(setTimeout(() => setVisibleHoverAction(true), HOVER_DELAY));
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleHoverAction(false);
    };

    return (
        <div className={classes.icon}>
            <IconButton
                onClick={onClick}
                onMouseEnter={handleHoverAction}
                onMouseLeave={handleLeaveAction}
                color="primary"
                size={size}
            >
                <>{icon}</>
                <HoverAction visible={visibleHoverAction} actionText={actionText}/>
            </IconButton>
        </div>
    );
};

export default ActionIconButton;
