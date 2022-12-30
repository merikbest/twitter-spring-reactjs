import React, {FC, memo, ReactElement} from "react";
import {Avatar} from "@material-ui/core";

import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import {useConversationInfoStyles} from "../ConversationInfoStyles";
import {Image} from "../../../../store/types/common";

interface ConversationUserAvatarProps {
    avatar?: Image;
}

const ConversationUserAvatar: FC<ConversationUserAvatarProps> = memo(({avatar}): ReactElement => {
    const classes = useConversationInfoStyles();

    return <Avatar className={classes.participantAvatar} src={avatar ? avatar.src : DEFAULT_PROFILE_IMG}/>;
});

export default ConversationUserAvatar;
