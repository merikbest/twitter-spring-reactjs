import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";

import { useChatParticipantStyles } from "./ChatParticipantStyles";
import { Avatar, ListItem, Typography } from "@material-ui/core";
import { DEFAULT_PROFILE_IMG } from "../../../constants/url-constants";
import { ChatResponse } from "../../../types/chat";
import { selectUserDataId } from "../../../store/ducks/user/selectors";

interface ChatParticipantProps {
    chat: ChatResponse;
    participantUserId?: number;
    handleListItemClick: (chat: ChatResponse) => void;
}

const ChatParticipant: FC<ChatParticipantProps> = memo((
    {
        chat,
        participantUserId,
        handleListItemClick
    }
): ReactElement => {
    const classes = useChatParticipantStyles();
    const myProfileId = useSelector(selectUserDataId);
    const isParticipantSelected = chat.participants.findIndex((participant) => participant.id === participantUserId);
    const isMyProfile = myProfileId === chat.participants[1].user.id;

    return (
        <ListItem
            className={classes.listItem}
            id={isParticipantSelected ? "selected" : ""}
            selected={isParticipantSelected !== -1}
            onClick={() => handleListItemClick(chat)}
            button
        >
            <div className={classes.userWrapper}>
                <Avatar
                    className={classes.userAvatar}
                    src={(isMyProfile) ? (
                        chat.participants[0].user.avatar ?? DEFAULT_PROFILE_IMG
                    ) : (
                        chat.participants[1].user.avatar ?? DEFAULT_PROFILE_IMG
                    )}
                />
                <div>
                    <Typography variant={"h6"} component={"span"}>
                        {(isMyProfile) ? (
                            chat.participants[0].user.fullName
                        ) : (
                            chat.participants[1].user.fullName
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"} component={"span"} className={classes.username}>
                        {(isMyProfile) ? (
                            `@${chat.participants[0].user.username}`
                        ) : (
                            `@${chat.participants[1].user.username}`
                        )}
                    </Typography>
                </div>
            </div>
        </ListItem>
    );
});

export default ChatParticipant;
