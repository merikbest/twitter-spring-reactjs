import React, {FC, ReactElement} from 'react';

import {useHoverActionStyles} from "./HoverActionStyles";

interface HoverActionProps {
    actionText: string;
}

const HoverAction: FC<HoverActionProps> = ({actionText}): ReactElement => {
    const classes = useHoverActionStyles();

    return (
        <div className={classes.container}>
            <span>{actionText}</span>
        </div>
    );
};

export default HoverAction;
