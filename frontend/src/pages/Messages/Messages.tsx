import React, { FC, ReactElement } from "react";
import { Route } from "react-router-dom";
import { Grid, List, Paper } from "@material-ui/core";

import { useMessagesStyles } from "./MessagesStyles";
import ConversationInfo from "./ConversationInfo/ConversationInfo";
import Spinner from "../../components/Spinner/Spinner";
import { useGlobalStyles } from "../../util/globalClasses";
import ChatMessages from "./ChatMessages";
import { withDocumentTitle } from "../../hoc/withDocumentTitle";
import { MESSAGES, MESSAGES_SETTINGS } from "../../constants/path-constants";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import StartConversation from "./StartConversation/StartConversation";
import ChatParticipant from "./ChatParticipant/ChatParticipant";
import MessageSettings from "./MessageSettings/MessageSettings";
import SearchChatParticipant from "./SearchChatParticipant/SearchChatParticipant";
import { useMessages } from "./useMessages";

const Messages: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useMessagesStyles();
    const { chats, isChatsLoading, participantId, chatId, handleListItemClick } = useMessages();

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
