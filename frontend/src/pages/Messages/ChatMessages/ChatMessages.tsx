import React, { FC, ReactElement } from "react";
import { Paper } from "@material-ui/core";
import classnames from "classnames";

import { useChatMessagesStyles } from "./ChatMessagesStyles";
import { useGlobalStyles } from "../../../util/globalClasses";
import Spinner from "../../../components/Spinner/Spinner";
import EmptyChatMessages from "./EmptyChatMessages";
import ChatHeader from "./ChatHeader";
import ChatMessage from "./ChatMessage";
import ChatUserBlocked from "./ChatUserBlocked";
import ChatFooter from "./ChatFooter";
import { useChatMessages } from "./useChatMessages";

interface ChatMessagesProps {
    participantId?: number;
    chatId?: number;
}

const ChatMessages: FC<ChatMessagesProps> = ({ participantId, chatId }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useChatMessagesStyles();
    const {
        myProfileId,
        chatParticipant,
        messages,
        isChatMessagesLoading,
        chatEndRef,
    } = useChatMessages(participantId, chatId);

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.chatContainer)} variant="outlined">
            {(!participantId) ? (
                <EmptyChatMessages />
            ) : (
                <>
                    <ChatHeader />
                    <Paper className={classes.chat}>
                        {isChatMessagesLoading ? (
                            <Spinner paddingTop={150} />
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <ChatMessage
                                        key={message.id}
                                        message={message}
                                        isParticipantMessage={message.author.id !== myProfileId}
                                    />
                                ))}
                                <div ref={chatEndRef} />
                            </>
                        )}
                    </Paper>
                    <>
                        {chatParticipant?.isUserBlocked ? (
                            <ChatUserBlocked />
                        ) : (
                            <ChatFooter chatId={chatId!} />
                        )}
                    </>
                </>
            )}
        </Paper>
    );
};

export default ChatMessages;
