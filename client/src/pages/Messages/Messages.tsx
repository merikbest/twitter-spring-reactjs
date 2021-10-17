import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import {Link} from "react-router-dom";
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
import {CheckIcon, EmojiIcon, GifIcon, MediaIcon, SandMessageIcon, SearchIcon} from "../../icons";
import {MessageInput} from "./MessageInput/MessageInput";
import {Chat, ChatParticipant} from "../../store/ducks/chats/contracts/state";
import {addChatMessage, fetchChatMessages} from "../../store/ducks/chatMessages/actionCreators";
import {selectChatMessagesItems} from "../../store/ducks/chatMessages/selectors";
import {fetchReadMessages} from "../../store/ducks/user/actionCreators";
import {formatChatMessageDate, formatDate} from "../../util/formatDate";
import {textFormatter} from "../../util/textFormatter";

const Messages: FC = (): ReactElement => {
    const classes = useMessagesStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const chats = useSelector(selectChatsItems);
    const messages = useSelector(selectChatMessagesItems);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const [text, setText] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [visibleModalWindow, setVisibleModalWindow] = useState<boolean>(false);
    const [participant, setParticipant] = useState<ChatParticipant>();
    const [chat, setChat] = useState<Chat>();

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
                                                <div style={{flex: 1}}>
                                                    <div className={classes.userHeader}>
                                                        <div style={{width: 300}}>
                                                            <Typography className={classes.userFullName}>
                                                                {(myProfile?.id === chat.participants[1].id!) ? (
                                                                    chat.participants[0].fullName
                                                                ) : (
                                                                    chat.participants[1].fullName
                                                                )}
                                                            </Typography>
                                                            <Typography className={classes.username}>
                                                                {(myProfile?.id === chat.participants[1].id!) ? (
                                                                    "@" + chat.participants[0].username
                                                                ) : (
                                                                    "@" + chat.participants[1].username
                                                                )}
                                                            </Typography>
                                                        </div>
                                                    </div>
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
                            <Paper className={classes.chatHeader}>
                                <Avatar
                                    className={classes.chatAvatar}
                                    src={participant?.avatar?.src ? participant?.avatar.src : DEFAULT_PROFILE_IMG}
                                />
                                <div style={{flex: 1}}>
                                    <Typography variant="h6">{participant?.fullName}</Typography>
                                    <Typography variant="caption" display="block" gutterBottom>
                                        @{participant?.username}
                                    </Typography>
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
                                                            <span>{textFormatter(message.tweet?.text)}</span>
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
                                                                    <div className={classes.participantTweetInfoWrapper}>
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
                                                                        <span
                                                                            className={classes.participantTweetUsername}>·</span>
                                                                        <span className={classes.participantTweetUsername}>
                                                                        {formatDate(new Date(message.tweet?.dateTime!))}
                                                                    </span>
                                                                    </div>
                                                                    <span>{textFormatter(message.tweet?.text)}</span>
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
                                <div ref={chatEndRef}></div>
                            </Paper>
                            <Paper className={classes.chatFooter}>
                                <div className={classes.chatIcon}>
                                    <IconButton color="primary">
                                        <span>{MediaIcon}</span>
                                    </IconButton>
                                </div>
                                <div className={classes.chatIcon}>
                                    <IconButton color="primary">
                                        <span>{GifIcon}</span>
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
                                    <IconButton color="primary">
                                        <span>{EmojiIcon}</span>
                                    </IconButton>
                                </div>
                                <div style={{marginLeft: 8}} className={classes.chatIcon}>
                                    <IconButton onClick={onSendMessage} color="primary">
                                        <span>{SandMessageIcon}</span>
                                    </IconButton>
                                </div>
                            </Paper>
                        </Paper>
                    </div>
                )}
            </Grid>
            <MessagesModal
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}/>
        </>
    );
};

export default Messages;
