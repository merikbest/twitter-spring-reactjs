import React, {FC, ReactElement} from 'react';

import {useHoverActionStyles} from "./HoverActionStyles";

interface HoverActionProps {
    visible?: boolean;
    positionTop?: boolean;
    actionText: string;
}

const HoverAction: FC<HoverActionProps> = ({visible, positionTop, actionText}): ReactElement | null => {
    const classes = useHoverActionStyles({positionTop});

    if (visible) {
        return (
            <div className={classes.container}>
                <span id={"action-text"}>
                    {actionText}
                </span>
            </div>
        );
    } else {
        return null;
    }
};

export default HoverAction;
