import React, { FC, ReactElement, useCallback, useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Grid, List, Paper } from "@material-ui/core";

import { useMessagesStyles } from "./MessagesStyles";
import { fetchChats, resetChatsState } from "../../store/ducks/chats/actionCreators";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { selectChatsItems, selectIsChatsLoading } from "../../store/ducks/chats/selectors";
import { resetChatMessages } from "../../store/ducks/chatMessages/actionCreators";
import ConversationInfo from "./ConversationInfo/ConversationInfo";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import { ChatResponse } from "../../types/chat";
import ChatMessages from "./ChatMessages/ChatMessages";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { MESSAGES, MESSAGES_SETTINGS } from "../../constants/path-constants";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import StartConversation from "./StartConversation/StartConversation";
import ChatParticipant from "./ChatParticipant/ChatParticipant";
import MessageSettings from "./MessageSettings/MessageSettings";
import SearchChatParticipant from "./SearchChatParticipant/SearchChatParticipant";
import { resetChatState } from "../../store/ducks/chat/actionCreators";
import { resetUserProfileState } from "../../store/ducks/userProfile/actionCreators";

const Messages: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useMessagesStyles();
    const dispatch = useDispatch();
    const location = useLocation<{ removeParticipant: boolean | undefined; }>();
    const myProfileId = useSelector(selectUserDataId);
    const chats = useSelector(selectChatsItems);
    const isChatsLoading = useSelector(selectIsChatsLoading);
    const [participantId, setParticipantId] = useState<number | undefined>(undefined);
    const [chatId, setChatId] = useState<number | undefined>(undefined);

    useEffect(() => {
        dispatch(fetchChats());

        return () => {
            dispatch(resetChatsState());
            dispatch(resetChatState());
            dispatch(resetUserProfileState());
        };
    }, []);

    useEffect(() => {
        if (location.state?.removeParticipant === true) {
            setParticipantId(undefined);
            dispatch(resetChatMessages());
            dispatch(resetChatState());
        }
    }, [location.state?.removeParticipant]);

    const handleListItemClick = useCallback((chat: ChatResponse): void => {
        setParticipantId((chat.participants[0].user.id === myProfileId) ? chat.participants[1].id : chat.participants[0].id);
        setChatId(chat.id);
    }, []);

    return (
        <>
            <Grid className={classes.grid} md={4} item>
                <Paper className={globalClasses.pageContainer} variant="outlined">
                    <MessagesHeader />
                    {isChatsLoading ? (
                        <Spinner paddingTop={150} />
                    ) : (
                        (chats.length === 0) ? (
                            <StartConversation />
                        ) : (
                            <>
                                <SearchChatParticipant />
                                <List component="nav" className={classes.list}>
                                    {chats.map((chat) => (
                                        <ChatParticipant
                                            key={chat.id}
                                            chat={chat}
                                            participantUserId={participantId}
                                            handleListItemClick={handleListItemClick}
                                        />
                                    ))}
                                </List>
                            </>
                        )
                    )}
                </Paper>
            </Grid>
            <Grid className={classes.grid} md={5} item>
                <Route exact path={MESSAGES_SETTINGS}>
                    <MessageSettings />
                </Route>
                <Route exact path={`${MESSAGES}/:id/info`}>
                    <ConversationInfo participantId={participantId} chatId={chatId} />
                </Route>
                <Route exact path={MESSAGES}>
                    <ChatMessages participantId={participantId} chatId={chatId} />
                </Route>
            </Grid>
        </>
    );
};

export default withDocumentTitle(Messages)("Messages");
