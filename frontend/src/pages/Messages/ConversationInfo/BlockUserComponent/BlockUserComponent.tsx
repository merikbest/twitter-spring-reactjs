import React, { FC, memo, ReactElement } from "react";
import classnames from "classnames";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();
    const classes = useConversationInfoStyles();

    return (
        <div
            id={"onOpenBlockUserModal"}
            className={classnames(classes.conversationInfoButton, classes.blockUser)}
            onClick={onOpenBlockUserModal}
        >
            <Typography variant={"body1"} component={"span"}>
                {isUserBlocked
                    ? t("UNBLOCK", { defaultValue: "Unblock" })
                    : t("BLOCK", { defaultValue: "Block" })}
                {` @${username}`}
            </Typography>
        </div>
    );
});

export default BlockUserComponent;
