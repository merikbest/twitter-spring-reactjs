import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {Link, Route, useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {Avatar, Button, Grid, IconButton, InputAdornment, List, ListItem, Paper, Typography} from "@material-ui/core";
import classNames from "classnames";

import {useMessagesStyles} from "./MessagesStyles";
import MessagesModal from "./MessagesModal/MessagesModal";
import {fetchChats} from "../../store/ducks/chats/actionCreators";
import {selectUserData} from "../../store/ducks/user/selectors";
import {selectChatsItems} from "../../store/ducks/chats/selectors";
import {PeopleSearchInput} from "./PeopleSearchInput/PeopleSearchInput";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {
    CheckIcon,
    EmojiIcon,
    GifIcon,
    MediaIcon,
    SendMessageIcon,
    SearchIcon,
    SettingsIcon,
    NewMessageIcon,
    DetailsIcon
} from "../../icons";
import {MessageInput} from "./MessageInput/MessageInput";
import {Chat, ChatParticipant} from "../../store/ducks/chats/contracts/state";
import {addChatMessage, fetchChatMessages} from "../../store/ducks/chatMessages/actionCreators";
import {selectChatMessagesItems} from "../../store/ducks/chatMessages/selectors";
import {fetchReadMessages} from "../../store/ducks/user/actionCreators";
import {formatChatMessageDate, formatDate} from "../../util/formatDate";
import {textFormatter} from "../../util/textFormatter";
import HoverAction from "../../components/HoverAction/HoverAction";
import BackButton from "../../components/BackButton/BackButton";
import DirectMessages from "../Settings/PrivacyAndSafety/DirectMessages/DirectMessages";
import ConversationInfo from "./ConversationInfo/ConversationInfo";

export enum MessagesAction {
    SETTINGS = "SETTINGS",
    MEDIA = "MEDIA",
    GIF = "GIF",
    EMOJI = "EMOJI",
    SEND = "SEND",
    NEW_MESSAGE = "NEW_MESSAGE",
    DETAILS = "DETAILS",
}

interface VisibleActions {
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
    const classes = useMessagesStyles();
    const dispatch = useDispatch();
    const history = useHistory();
    const myProfile = useSelector(selectUserData);
    const chats = useSelector(selectChatsItems);
    const messages = useSelector(selectChatMessagesItems);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [text, setText] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [participant, setParticipant] = useState<ChatParticipant>();
    const [chat, setChat] = useState<Chat>();
    const [delayHandler, setDelayHandler] = useState<any>(null);
    const [visibleHoverAction, setVisibleHoverAction] = useState<VisibleActions>({...initialState});

    useEffect(() => {
        dispatch(fetchChats());
        scrollToBottom();
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const scrollToBottom = () => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({behavior: 'smooth'})
        }
    };

    const onOpenModalWindow = (): void => {
        setVisibleModalWindow(true);
    };

    const onCloseModalWindow = (): void => {
        setVisibleModalWindow(false);
    };

    const handleListItemClick = (chat: Chat): void => {
        history.push("/messages");
        dispatch(fetchChatMessages(chat?.id!));
        dispatch(fetchReadMessages(chat?.id!));
        setParticipant(chat.participants[1]);
        setChat(chat);
    };

    const onSendMessage = (): void => {
        if (message !== "") {
            dispatch(addChatMessage({chatId: chat?.id!, text: message}));
            setMessage("");
        }
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
                <div className={classes.messagesContainer}>
                    <Paper variant="outlined">
                        <Paper className={classes.header}>
                            <div>
                                <Typography variant="h6">
                                    Messages
                                </Typography>
                            </div>
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
                        {(chats.length === 0) ? (
                            <>
                                <div className={classes.messagesTitle}>
                                    Send a message, get a message
                                </div>
                                <div className={classes.messagesText}>
                                    Direct Messages are private conversations between you and other people on Twitter.
                                    Share Tweets, media, and more!
                                </div>
                                <Button
                                    onClick={onOpenModalWindow}
                                    className={classes.messagesButton}
                                    variant="contained"
                                    color="primary"
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
                                            id={(participant?.id === chat.participants[0].id!) ? ("selected") : ("")}
                                            selected={participant?.id === chat.participants[0].id!}
                                            onClick={() => handleListItemClick(chat)}
                                        >
                                            <div className={classes.userWrapper}>
                                                <Avatar
                                                    className={classes.userAvatar}
                                                    src={(myProfile?.id === chat.participants[1].id!) ? (
                                                        (chat.participants[0].avatar?.src) ? (
                                                            chat.participants[0].avatar.src
                                                        ) : (
                                                            DEFAULT_PROFILE_IMG
                                                        )
                                                    ) : ((chat.participants[1].avatar?.src) ? (
                                                            chat.participants[1].avatar.src
                                                        ) : (
                                                            DEFAULT_PROFILE_IMG
                                                        )
                                                    )}
                                                />
                                                <div>
                                                    <Typography component={"div"} className={classes.userFullName}>
                                                        {(myProfile?.id === chat.participants[1].id!) ? (
                                                            chat.participants[0].fullName
                                                        ) : (
                                                            chat.participants[1].fullName
                                                        )}
                                                    </Typography>
                                                    <Typography component={"div"} className={classes.username}>
                                                        {(myProfile?.id === chat.participants[1].id!) ? (
                                                            "@" + chat.participants[0].username
                                                        ) : (
                                                            "@" + chat.participants[1].username
                                                        )}
                                                    </Typography>
                                                </div>
                                            </div>
                                        </ListItem>
                                    ))}
                                </List>
                            </>
                        )}
                    </Paper>
                </div>
            </Grid>
            <Grid className={classes.grid} md={5} item>
                <Route exact path="/messages/settings">
                    <div className={classes.chatContainer}>
                        <Paper variant="outlined">
                            <Paper className={classes.chatHeader}>
                                <BackButton/>
                                <Typography variant="h6">
                                    Direct Messages
                                </Typography>
                            </Paper>
                            <div className={classes.pageInfoWrapper}>
                                <DirectMessages/>
                            </div>
                        </Paper>
                    </div>
                </Route>
                <Route exact path="/messages/:id/info">
                    <ConversationInfo chatParticipant={participant}/>
                </Route>
                <Route exact path="/messages">
                    {(participant?.id === undefined) ? (
                        <div className={classes.chatContainer}>
                            <Paper variant="outlined">
                                <div className={classes.chatInfoWrapper}>
                                    <div className={classes.chatInfoTitle}>
                                        You don’t have a message selected
                                    </div>
                                    <div className={classes.chatInfoText}>
                                        Choose one from your existing messages, or start a new one.
                                    </div>
                                    <Button
                                        onClick={onOpenModalWindow}
                                        className={classes.chatInfoButton}
                                        variant="contained"
                                        color="primary"
                                    >
                                        New message
                                    </Button>
                                </div>
                            </Paper>
                        </div>
                    ) : (
                        <div className={classes.chatContainer}>
                            <Paper variant="outlined">
                                <Paper className={classes.chatHeader} style={{paddingLeft: 15}}>
                                    <Avatar
                                        className={classes.chatAvatar}
                                        src={participant?.avatar?.src ? participant?.avatar.src : DEFAULT_PROFILE_IMG}
                                    />
                                    <div style={{flex: 1}}>
                                        <Typography variant="h6">
                                            {participant?.fullName}
                                        </Typography>
                                        <Typography variant="caption" display="block" gutterBottom>
                                            @{participant?.username}
                                        </Typography>
                                    </div>
                                    <div className={classes.iconGroup}>
                                        <div className={classes.icon}>
                                            <Link to={`/messages/${participant.id}/info`}>
                                                <IconButton
                                                    onMouseEnter={() => handleHoverAction(MessagesAction.DETAILS)}
                                                    onMouseLeave={handleLeaveAction}
                                                    color="primary"
                                                >
                                                    <>{DetailsIcon}</>
                                                    <HoverAction
                                                        visible={visibleHoverAction.visibleDetailsAction}
                                                        actionText={"Details"}
                                                    />
                                                </IconButton>
                                            </Link>
                                        </div>
                                    </div>
                                </Paper>
                                <Paper className={classes.chat}>
                                    {messages.map(message => (
                                        (message.author.id === myProfile?.id) ? (
                                            <React.Fragment key={message.id}>
                                                {message.tweet && (
                                                    <div className={classes.tweetContainer}>
                                                        <Link to={`/home/tweet/${message.tweet.id}`}>
                                                            <div className={classes.tweetWrapper}>
                                                                <div className={classes.tweetUserInfoWrapper}>
                                                                    <Avatar
                                                                        className={classes.tweetAvatar}
                                                                        src={(message.tweet?.user.avatar?.src) ? (
                                                                            message.tweet?.user.avatar?.src
                                                                        ) : (
                                                                            DEFAULT_PROFILE_IMG
                                                                        )}
                                                                    />
                                                                    <span className={classes.tweetUserFullName}>
                                                                        {message.tweet?.user.fullName}
                                                                    </span>
                                                                    <span className={classes.tweetUsername}>
                                                                        @{message.tweet?.user.username}
                                                                    </span>
                                                                    <span className={classes.tweetUsername}>·</span>
                                                                    <span className={classes.tweetUsername}>
                                                                        {formatDate(new Date(message.tweet?.dateTime!))}
                                                                    </span>
                                                                </div>
                                                                <span>
                                                                    {textFormatter(message.tweet?.text)}
                                                                </span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                )}
                                                {message.text && (
                                                    <div className={classNames(
                                                        classes.myMessage,
                                                        message.tweet ? classes.myMessageWithTweet : classes.myMessageCommon
                                                    )}>
                                                        <span>{message.text}</span>
                                                    </div>
                                                )}
                                                <div className={classes.myMessageDate}>
                                                    <span>{CheckIcon}</span>
                                                    <span>{formatChatMessageDate(new Date(message.date))}</span>
                                                </div>
                                            </React.Fragment>
                                        ) : (
                                            <React.Fragment key={message.id}>
                                                <div className={classes.participantContainer}>
                                                    <Avatar
                                                        className={classes.participantAvatar}
                                                        src={(myProfile?.id === chat?.participants[1].id!) ? (
                                                            (chat?.participants[0].avatar?.src) ? (
                                                                chat?.participants[0].avatar.src
                                                            ) : (
                                                                DEFAULT_PROFILE_IMG
                                                            )
                                                        ) : ((chat?.participants[1].avatar?.src) ? (
                                                                chat?.participants[1].avatar.src
                                                            ) : (
                                                                DEFAULT_PROFILE_IMG
                                                            )
                                                        )}
                                                    />
                                                    <div>
                                                        {message.tweet && (
                                                            <div className={classes.participantTweetContainer}>
                                                                <Link to={`/home/tweet/${message.tweet.id}`}>
                                                                    <div className={classes.participantTweetWrapper}>
                                                                        <div
                                                                            className={classes.participantTweetInfoWrapper}>
                                                                            <Avatar
                                                                                className={classes.participantTweetAvatar}
                                                                                src={(message.tweet?.user.avatar?.src) ? (
                                                                                    message.tweet?.user.avatar?.src
                                                                                ) : (
                                                                                    DEFAULT_PROFILE_IMG
                                                                                )}
                                                                            />
                                                                            <span className={classes.participantTweetFullName}>
                                                                                {message.tweet?.user.fullName}
                                                                            </span>
                                                                            <span className={classes.participantTweetUsername}>
                                                                                @{message.tweet?.user.username}
                                                                            </span>
                                                                            <span className={classes.participantTweetUsername}>·</span>
                                                                            <span className={classes.participantTweetUsername}>
                                                                                {formatDate(new Date(message.tweet?.dateTime!))}
                                                                            </span>
                                                                        </div>
                                                                        <span>
                                                                            {textFormatter(message.tweet?.text)}
                                                                        </span>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        )}
                                                        {message.text && (
                                                            <div className={classNames(
                                                                classes.participantMessage,
                                                                message.tweet ? classes.participantMessageWithTweet : classes.participantMessageCommon
                                                            )}>
                                                                <span>{message.text}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className={classes.participantMessageDate}>
                                                    {formatChatMessageDate(new Date(message.date))}
                                                </div>
                                            </React.Fragment>
                                        )
                                    ))}
                                    <div ref={chatEndRef}/>
                                </Paper>
                                <Paper className={classes.chatFooter}>
                                    <div className={classes.chatIcon}>
                                        <IconButton
                                            onMouseEnter={() => handleHoverAction(MessagesAction.MEDIA)}
                                            onMouseLeave={handleLeaveAction}
                                            color="primary"
                                        >
                                            <span>{MediaIcon}</span>
                                            <HoverAction
                                                visible={visibleHoverAction.visibleMediaAction}
                                                positionTop={true}
                                                actionText={"Media"}
                                            />
                                        </IconButton>
                                    </div>
                                    <div className={classes.chatIcon}>
                                        <IconButton
                                            onMouseEnter={() => handleHoverAction(MessagesAction.GIF)}
                                            onMouseLeave={handleLeaveAction}
                                            color="primary"
                                        >
                                            <span>{GifIcon}</span>
                                            <HoverAction
                                                visible={visibleHoverAction.visibleGIFAction}
                                                positionTop={true}
                                                actionText={"GIF"}
                                            />
                                        </IconButton>
                                    </div>
                                    <MessageInput
                                        multiline
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        variant="outlined"
                                        placeholder="Start a new message"
                                    />
                                    <div className={classes.emojiIcon}>
                                        <IconButton
                                            onMouseEnter={() => handleHoverAction(MessagesAction.EMOJI)}
                                            onMouseLeave={handleLeaveAction}
                                            color="primary"
                                        >
                                            <span>{EmojiIcon}</span>
                                            <HoverAction
                                                visible={visibleHoverAction.visibleEmojiAction}
                                                positionTop={true}
                                                actionText={"Emoji"}
                                            />
                                        </IconButton>
                                    </div>
                                    <div style={{marginLeft: 8}} className={classes.chatIcon}>
                                        <IconButton
                                            onClick={onSendMessage}
                                            onMouseEnter={() => handleHoverAction(MessagesAction.SEND)}
                                            onMouseLeave={handleLeaveAction}
                                            color="primary"
                                        >
                                            <span>{SendMessageIcon}</span>
                                            <HoverAction
                                                visible={visibleHoverAction.visibleSendAction}
                                                positionTop={true}
                                                actionText={"Send"}
                                            />
                                        </IconButton>
                                    </div>
                                </Paper>
                            </Paper>
                        </div>
                    )}
                </Route>
            </Grid>
            <MessagesModal
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </>
    );
};

export default Messages;
