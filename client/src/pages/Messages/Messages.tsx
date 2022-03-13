import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {Link, Route, useHistory, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Grid, IconButton, InputAdornment, List, ListItem, Paper, Typography} from "@material-ui/core";
import classnames from "classnames";

import {useMessagesStyles} from "./MessagesStyles";
import MessagesModal from "./MessagesModal/MessagesModal";
import {fetchChats, resetChatsState} from "../../store/ducks/chats/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import {selectChatsItems, selectIsChatsLoading} from "../../store/ducks/chats/selectors";
import {PeopleSearchInput} from "./PeopleSearchInput/PeopleSearchInput";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {NewMessageIcon, SearchIcon, SettingsIcon} from "../../icons";
import {fetchChatMessages, resetChatMessages} from "../../store/ducks/chatMessages/actionCreators";
import {selectChatMessagesItems} from "../../store/ducks/chatMessages/selectors";
import {fetchReadMessages} from "../../store/ducks/user/actionCreators";
import HoverAction from "../../components/HoverAction/HoverAction";
import BackButton from "../../components/BackButton/BackButton";
import DirectMessages from "../Settings/PrivacyAndSafety/DirectMessages/DirectMessages";
import ConversationInfo from "./ConversationInfo/ConversationInfo";
import Spinner from "../../components/Spinner/Spinner";
import {useGlobalStyles} from "../../util/globalClasses";
import {ChatResponse, ParticipantResponse} from "../../store/types/chat";
import ChatMessages from "./ChatMessages/ChatMessages";
import {withDocumentTitle} from "../../hoc/withDocumentTitle";

export enum MessagesAction {
    SETTINGS = "SETTINGS",
    MEDIA = "MEDIA",
    GIF = "GIF",
    EMOJI = "EMOJI",
    SEND = "SEND",
    NEW_MESSAGE = "NEW_MESSAGE",
    DETAILS = "DETAILS",
}

export interface VisibleActions {
    visibleSettingsAction: boolean;
    visibleMediaAction: boolean;
    visibleGIFAction: boolean;
    visibleEmojiAction: boolean;
    visibleSendAction: boolean;
    visibleNewMessageAction: boolean;
    visibleDetailsAction: boolean;
}

const initialState = {
    visibleSettingsAction: false,
    visibleMediaAction: false,
    visibleGIFAction: false,
    visibleEmojiAction: false,
    visibleSendAction: false,
    visibleNewMessageAction: false,
    visibleDetailsAction: false,
}

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

    const [text, setText] = useState<string>("");
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [participant, setParticipant] = useState<ParticipantResponse>();
    const [chat, setChat] = useState<ChatResponse>();
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const [visibleHoverAction, setVisibleHoverAction] = useState<VisibleActions>({...initialState});

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
        if (location.pathname === "/messages") {
            if (participant !== undefined) {
                handleLeaveAction();
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
        history.push("/messages");
        dispatch(fetchChatMessages(chat?.id!));
        dispatch(fetchReadMessages(chat?.id!));
        setParticipant((chat.participants[0].user.id === myProfile?.id) ? chat.participants[1] : chat.participants[0]);
        setChat(chat);
    };

    const handleHoverAction = (action: MessagesAction): void => {
        if (action === MessagesAction.SETTINGS) {
            setHoverAction({...initialState, visibleSettingsAction: true});
        } else if (action === MessagesAction.MEDIA) {
            setHoverAction({...initialState, visibleMediaAction: true});
        } else if (action === MessagesAction.GIF) {
            setHoverAction({...initialState, visibleGIFAction: true});
        } else if (action === MessagesAction.EMOJI) {
            setHoverAction({...initialState, visibleEmojiAction: true});
        } else if (action === MessagesAction.SEND) {
            setHoverAction({...initialState, visibleSendAction: true});
        } else if (action === MessagesAction.NEW_MESSAGE) {
            setHoverAction({...initialState, visibleNewMessageAction: true});
        } else if (action === MessagesAction.DETAILS) {
            setHoverAction({...initialState, visibleDetailsAction: true});
        }
    };

    const setHoverAction = (name: VisibleActions): void => {
        setDelayHandler(setTimeout(() => setVisibleHoverAction(name), 500));
    };

    const handleLeaveAction = (): void => {
        clearTimeout(delayHandler);
        setVisibleHoverAction({...initialState})
    };

    return (
        <>
            <Grid className={classes.grid} md={4} item>
                <Paper className={globalClasses.pageContainer} variant="outlined">
                    <Paper className={classnames(globalClasses.pageHeader, classes.header)} variant="outlined">
                        <Typography variant="h5" className={globalClasses.pageHeaderTitleWrapper}>
                            Messages
                        </Typography>
                        <div className={classes.iconGroup}>
                            <div className={classes.icon}>
                                <Link to={"/messages/settings"}>
                                    <IconButton
                                        onMouseEnter={() => handleHoverAction(MessagesAction.SETTINGS)}
                                        onMouseLeave={handleLeaveAction}
                                        color="primary"
                                    >
                                        <>{SettingsIcon}</>
                                        <HoverAction
                                            visible={visibleHoverAction.visibleSettingsAction}
                                            actionText={"Settings"}
                                        />
                                    </IconButton>
                                </Link>
                            </div>
                            <div className={classes.icon}>
                                <IconButton
                                    onClick={onOpenModalWindow}
                                    onMouseEnter={() => handleHoverAction(MessagesAction.NEW_MESSAGE)}
                                    onMouseLeave={handleLeaveAction}
                                    color="primary"
                                >
                                    <>{NewMessageIcon}</>
                                    <HoverAction
                                        visible={visibleHoverAction.visibleNewMessageAction}
                                        actionText={"New message"}
                                    />
                                </IconButton>
                            </div>
                        </div>
                    </Paper>
                    {isChatsLoading ? <Spinner paddingTop={150}/> : (
                        (chats.length === 0) ? (
                            <>
                                <Typography variant={"h4"} component={"div"} className={classes.messagesTitle}>
                                    Send a message, get a message
                                </Typography>
                                <Typography variant={"subtitle1"} component={"div"} className={classes.messagesText}>
                                    Direct Messages are private conversations between you and other people on Twitter.
                                    Share Tweets, media, and more!
                                </Typography>
                                <Button
                                    onClick={onOpenModalWindow}
                                    className={classes.messagesButton}
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                >
                                    Start a conversation
                                </Button>
                            </>
                        ) : (
                            <>
                                <div className={classes.searchWrapper}>
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
                                </div>
                                <List component="nav" className={classes.list} aria-label="main mailbox folders">
                                    {chats.map((chat) => (
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
                                    ))}
                                </List>
                            </>
                        )
                    )}
                </Paper>
            </Grid>
            <Grid className={classes.grid} md={5} item>
                <Route exact path="/messages/settings">
                    <Paper className={classnames(globalClasses.pageContainer, classes.chatContainer)} variant="outlined">
                        <Paper className={classnames(globalClasses.pageHeader, classes.chatHeader)} variant="outlined">
                            <BackButton/>
                            <Typography variant="h5">
                                Direct Messages
                            </Typography>
                        </Paper>
                        <div className={globalClasses.contentWrapper}>
                            <DirectMessages/>
                        </div>
                    </Paper>
                </Route>
                <Route exact path="/messages/:id/info">
                    <ConversationInfo
                        participantId={participant?.id}
                        chatId={chat?.id}
                        onBlockParticipant={onBlockParticipant}
                    />
                </Route>
                <Route exact path="/messages">
                    <ChatMessages
                        onOpenModalWindow={onOpenModalWindow}
                        visibleHoverAction={visibleHoverAction}
                        handleHoverAction={handleHoverAction}
                        handleLeaveAction={handleLeaveAction}
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

export default withDocumentTitle(Messages);
