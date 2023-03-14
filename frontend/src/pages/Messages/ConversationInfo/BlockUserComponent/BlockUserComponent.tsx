import React, { FC, memo, ReactElement } from "react";
import classnames from "classnames";
import { Typography } from "@material-ui/core";

import { useConversationInfoStyles } from "../ConversationInfoStyles";

interface BlockUserComponentProps {
    onOpenBlockUserModal: () => void;
    isUserBlocked?: boolean;
    username?: string;
}

const BlockUserComponent: FC<BlockUserComponentProps> = memo((
    {
        onOpenBlockUserModal,
        isUserBlocked,
        username
    }
): ReactElement => {
    const classes = useConversationInfoStyles();

    return (
        <div
            id={"onOpenBlockUserModal"}
            className={classnames(classes.conversationInfoButton, classes.blockUser)}
            onClick={onOpenBlockUserModal}
        >
            <Typography variant={"body1"} component={"span"}>
                {isUserBlocked ? "Unblock " : "Block "} @{username}
            </Typography>
        </div>
    );
});

export default BlockUserComponent;
