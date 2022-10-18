import React, {FC, ReactElement} from "react";
import {useSelector} from "react-redux";

import {useChatParticipantStyles} from "./ChatParticipantStyles";
import {Avatar, ListItem, Typography} from "@material-ui/core";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {ChatResponse, ParticipantResponse} from "../../../store/types/chat";
import {selectUserData} from "../../../store/ducks/user/selectors";

interface ChatParticipantProps {
    chat: ChatResponse;
    participant?: ParticipantResponse;
    handleListItemClick: (chat: ChatResponse) => void;
}

const ChatParticipant: FC<ChatParticipantProps> = ({chat, participant, handleListItemClick}): ReactElement => {
    const classes = useChatParticipantStyles();
    const myProfile = useSelector(selectUserData);

    return (
        <ListItem
            key={chat.id}
            button
            className={classes.listItem}
            id={(participant?.user.id === chat.participants[0].user.id!) ? ("selected") : ("")}
            selected={participant?.user.id === chat.participants[0].user.id!}
            onClick={() => handleListItemClick(chat)}
        >
            <div className={classes.userWrapper}>
                <Avatar
                    className={classes.userAvatar}
                    src={(myProfile?.id === chat.participants[1].user.id!) ? (
                        (chat.participants[0].user.avatar?.src) ? (
                            chat.participants[0].user.avatar.src
                        ) : (
                            DEFAULT_PROFILE_IMG
                        )
                    ) : ((chat.participants[1].user.avatar?.src) ? (
                            chat.participants[1].user.avatar?.src
                        ) : (
                            DEFAULT_PROFILE_IMG
                        )
                    )}
                />
                <div>
                    <Typography variant={"h6"} component={"span"}>
                        {(myProfile?.id === chat.participants[1].user.id!) ? (
                            chat.participants[0].user.fullName
                        ) : (
                            chat.participants[1].user.fullName
                        )}
                    </Typography>
                    <Typography variant={"subtitle1"} component={"span"} className={classes.username}>
                        {(myProfile?.id === chat.participants[1].user.id!) ? (
                            `@${chat.participants[0].user.username}`
                        ) : (
                            `@${chat.participants[1].user.username}`
                        )}
                    </Typography>
                </div>
            </div>
        </ListItem>
    );
};

export default ChatParticipant;
