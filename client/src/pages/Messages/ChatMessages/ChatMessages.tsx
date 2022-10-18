import React, {FC, ReactElement, RefObject} from 'react';
import {Paper} from "@material-ui/core";
import {useSelector} from "react-redux";
import classnames from "classnames";

import {useChatMessagesStyles} from "./ChatMessagesStyles";
import {useGlobalStyles} from "../../../util/globalClasses";
import {ChatResponse, ParticipantResponse} from "../../../store/types/chat";
import {selectChatMessagesItems, selectIsChatMessagesLoading} from "../../../store/ducks/chatMessages/selectors";
import {selectUserData} from "../../../store/ducks/user/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import EmptyChatMessages from "./EmptyChatMessages/EmptyChatMesseges";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessage from "./ChatMessage/ChatMessage";
import ChatUserBlocked from "./ChatUserBlocked/ChatUserBlocked";
import ChatFooter from "./ChatFooter/ChatFooter";

interface ChatMessagesProps {
    onOpenModalWindow: () => void;
    participant?: ParticipantResponse;
    chat?: ChatResponse;
    chatEndRef: RefObject<HTMLDivElement> | null;
}

const ChatMessages: FC<ChatMessagesProps> = (
    {
        onOpenModalWindow,
        participant,
        chat,
        chatEndRef,
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useChatMessagesStyles();
    const myProfile = useSelector(selectUserData);
    const messages = useSelector(selectChatMessagesItems);
    const isChatMessagesLoading = useSelector(selectIsChatMessagesLoading);

    return (
        <Paper className={classnames(globalClasses.pageContainer, classes.chatContainer)} variant="outlined">
            {(!participant?.user.id) ? (
                <EmptyChatMessages onOpenModalWindow={onOpenModalWindow}/>
            ) : (
                <>
                    <ChatHeader participant={participant}/>
                    <Paper className={classes.chat}>
                        {isChatMessagesLoading ? (
                            <Spinner paddingTop={150}/>
                        ) : (
                            <>
                                {messages.map((message) => (
                                    <ChatMessage
                                        key={message.id}
                                        message={message}
                                        isParticipantMessage={message.author.id !== myProfile?.id}
                                        chat={chat}
                                        myProfileId={myProfile?.id}
                                    />
                                ))}
                                <div ref={chatEndRef}/>
                            </>
                        )}
                    </Paper>
                    <>
                        {participant.user.isUserBlocked ? (
                            <ChatUserBlocked/>
                        ) : (
                            <ChatFooter chatId={chat?.id!}/>
                        )}
                    </>
                </>
            )}
        </Paper>
    );
};

export default ChatMessages;
