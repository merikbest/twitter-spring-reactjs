import React, { FC, memo, ReactElement } from "react";
import { Avatar } from "@material-ui/core";
import { useConversationInfoStyles } from "../ConversationInfoStyles";

interface ConversationUserAvatarProps {
    avatar?: string;
}

const ConversationUserAvatar: FC<ConversationUserAvatarProps> = memo(({ avatar }): ReactElement => {
    const classes = useConversationInfoStyles();

    return <Avatar className={classes.participantAvatar} src={avatar} />;
});

export default ConversationUserAvatar;
