import React, {FC, ReactElement} from "react";
import {Avatar, Paper, Typography} from "@material-ui/core";
import classnames from "classnames";

import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import {MESSAGES} from "../../../../util/pathConstants";
import {DetailsIcon} from "../../../../icons";
import {useGlobalStyles} from "../../../../util/globalClasses";
import {useChatHeaderStyles} from "./ChatHeaderStyles";
import {ParticipantResponse} from "../../../../store/types/chat";
import {MessagesAction} from "../../ActionIcon/useMessageHoverAction";
import ActionIcon from "../../ActionIcon/ActionIcon";

interface ChatHeaderProps {
    participant: ParticipantResponse;
}

const ChatHeader: FC<ChatHeaderProps> = ({participant}): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useChatHeaderStyles();

    return (
        <Paper className={classnames(globalClasses.pageHeader, classes.chatHeader)}>
            <Avatar
                className={classes.chatAvatar}
                src={participant.user.avatar?.src ? participant.user.avatar.src : DEFAULT_PROFILE_IMG}
            />
            <div style={{flex: 1}}>
                <Typography variant="h5">
                    {participant.user.fullName}
                </Typography>
                <Typography variant="subtitle2" component={"div"}>
                    @{participant.user.username}
                </Typography>
            </div>
            <div className={classes.iconGroup}>
                <ActionIcon
                    path={`${MESSAGES}/${participant.user.id}/info`}
                    messageAction={MessagesAction.DETAILS}
                    actionText={"Details"}
                    visibleAction={"visibleDetailsAction"}
                    className={"icon"}
                    icon={DetailsIcon}
                />
            </div>
        </Paper>
    );
};

export default ChatHeader;
