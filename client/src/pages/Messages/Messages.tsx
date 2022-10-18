import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {Route, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Grid, InputAdornment, List, Paper} from "@material-ui/core";

import {useMessagesStyles} from "./MessagesStyles";
import MessagesModal from "./MessagesModal/MessagesModal";
import {fetchChats, resetChatsState} from "../../store/ducks/chats/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import {selectChatsItems, selectIsChatsLoading} from "../../store/ducks/chats/selectors";
import {PeopleSearchInput} from "./PeopleSearchInput/PeopleSearchInput";
import {SearchIcon} from "../../icons";
import {fetchChatMessages, resetChatMessages} from "../../store/ducks/chatMessages/actionCreators";
import {selectChatMessagesItems} from "../../store/ducks/chatMessages/selectors";
import {fetchReadMessages} from "../../store/ducks/user/actionCreators";
import ConversationInfo from "./ConversationInfo/ConversationInfo";
import Spinner from "../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../util/globalClasses";
import {ChatResponse, ParticipantResponse} from "../../store/types/chat";
import ChatMessages from "./ChatMessages/ChatMessages";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";
import {MESSAGES, MESSAGES_SETTINGS} from "../../util/pathConstants";
import MessagesHeader from "./MessagesHeader/MessagesHeader";
import StartConversation from "./StartConversation/StartConversation";
import ChatParticipant from "./ChatParticipant/ChatParticipant";
import MessageSettings from "./MessageSettings/MessageSettings";

const Messages: FC = (): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useMessagesStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation<{ removeParticipant: boolean | undefined; }>();
    const myProfile = useSelector(selectUserData);
    const chats = useSelector(selectChatsItems);
    const isChatsLoading = useSelector(selectIsChatsLoading);
    const messages = useSelector(selectChatMessagesItems);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [participant, setParticipant] = React.useState<ParticipantResponse>();
    const [text, setText] = useState<string>("");
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [chat, setChat] = useState<ChatResponse>();

    useEffect(() => {
        dispatch(fetchChats());
        scrollToBottom();

        return () => {
            dispatch(resetChatsState());
        };
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (location.state?.removeParticipant === true) {
            setParticipant(undefined);
            dispatch(resetChatMessages());
        }
    }, [location.state?.removeParticipant]);

    useEffect(() => {
        if (location.pathname === MESSAGES) {
            if (participant !== undefined) {
                dispatch(fetchChatMessages(chat?.id!));
                dispatch(fetchReadMessages(chat?.id!));
            }
        } else {
            dispatch(resetChatMessages());
        }
    }, [location]);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({behavior: 'smooth'})
        }
    };

    const onBlockParticipant = (): void => {
        if (participant !== undefined) {
            const newParticipant = {...participant};
            const newUser = {...newParticipant.user};
            newUser.isUserBlocked = !newUser.isUserBlocked;
            newParticipant.user = newUser;
            setParticipant(newParticipant);
        }
    };

    const onOpenModalWindow = (): void => {
        setVisibleModalWindow(true);
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
    };

    const handleListItemClick = (chat: ChatResponse): void => {
        history.push(MESSAGES);
        dispatch(fetchChatMessages(chat?.id!));
        dispatch(fetchReadMessages(chat?.id!));
        setParticipant((chat.participants[0].user.id === myProfile?.id) ? chat.participants[1] : chat.participants[0]);
        setChat(chat);
    };

    return (
        <>
            <Grid className={classes.grid} md={4} item>
                <Paper className={globalClasses.pageContainer} variant="outlined">
                    <MessagesHeader onOpenModalWindow={onOpenModalWindow}/>
                    {isChatsLoading ? (
                        <Spinner paddingTop={150}/>
                    ) : (
                        (chats.length === 0) ? (
                            <StartConversation onOpenModalWindow={onOpenModalWindow}/>
                        ) : (
                            <>
                                <PeopleSearchInput
                                    placeholder="Explore for people and groups"
                                    variant="outlined"
                                    onChange={(event) => setText(event.target.value)}
                                    value={text}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                {SearchIcon}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <List component="nav" className={classes.list}>
                                    {chats.map((chat) => (
                                        <ChatParticipant
                                            key={chat.id}
                                            chat={chat}
                                            participant={participant}
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
                    <MessageSettings/>
                </Route>
                <Route exact path={MESSAGES + "/:id/info"}>
                    <ConversationInfo
                        participantId={participant?.id}
                        chatId={chat?.id}
                        onBlockParticipant={onBlockParticipant}
                    />
                </Route>
                <Route exact path={MESSAGES}>
                    <ChatMessages
                        onOpenModalWindow={onOpenModalWindow}
                        participant={participant}
                        chat={chat}
                        chatEndRef={chatEndRef}
                    />
                </Route>
            </Grid>
            <MessagesModal
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </>
    );
};

export default withDocumentTitle(Messages)("Messages");
