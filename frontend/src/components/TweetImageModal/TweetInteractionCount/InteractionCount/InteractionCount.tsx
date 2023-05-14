import React, { FC, ReactElement } from "react";
import Typography from "@material-ui/core/Typography";

import { useInteractionCountStyles } from "./InteractionCountStyles";
import { UsersListModalAction } from "../../../UsersListModal/UsersListModal";

interface InteractionCountProps {
    id: string;
    title: string;
    interactionCount: number;
    modalAction: UsersListModalAction;
    onOpenUsersModalWindow: (modalAction: UsersListModalAction) => void;
}

const InteractionCount: FC<InteractionCountProps> = (
    {
        id,
        title,
        interactionCount,
        modalAction,
        onOpenUsersModalWindow
    }
): ReactElement => {
    const classes = useInteractionCountStyles();

    return (
        <>
            {(interactionCount !== 0) && (
                <span id={id} className={classes.interactionCount} onClick={() => onOpenUsersModalWindow(modalAction)}>
                    <span style={{ marginRight: 20 }}>
                        <Typography variant={"h6"} component={"span"}>
                            {interactionCount}
                        </Typography>
                        <Typography variant={"subtitle1"} component={"span"}>
                            {title}
                        </Typography>
                    </span>
                </span>
            )}
        </>
    );
};

export default InteractionCount;
