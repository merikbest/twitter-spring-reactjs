import React, {FC, MouseEvent, ReactElement, RefObject, useEffect, useState} from 'react';
import {Avatar, Button, IconButton, Link as MuiLink, Paper, Popover, Typography} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import classnames from "classnames";
import classNames from "classnames";
import {Link} from "react-router-dom";

import {useChatMessagesStyles} from "./ChatMessagesStyles";
import {useGlobalStyles} from "../../../util/globalClasses";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {CheckIcon, DetailsIcon, EmojiIcon, GifIcon, MediaIcon, SendMessageIcon} from "../../../icons";
import HoverAction from "../../../components/HoverAction/HoverAction";
import {formatChatMessageDate, formatDate} from "../../../util/formatDate";
import {textFormatter} from "../../../util/textFormatter";
import {MessageInput} from "../MessageInput/MessageInput";
import {MessagesAction, VisibleActions} from "../Messages";
import {ChatResponse, ParticipantResponse} from "../../../store/types/chat";
import {addChatMessage, resetChatMessages} from "../../../store/ducks/chatMessages/actionCreators";
import {
    selectChatMessagesItems,
    selectIsChatMessagesLoaded,
    selectIsChatMessagesLoading
} from "../../../store/ducks/chatMessages/selectors";
import {selectUserData} from "../../../store/ducks/user/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import {EmojiData, Picker} from "emoji-mart";
import EmojiConvertor from "emoji-js";

interface ChatMessagesProps {
    onOpenModalWindow: () => void;
    handleHoverAction: (action: MessagesAction) => void;
    handleLeaveAction: () => void;
    visibleHoverAction: VisibleActions;
    participant?: ParticipantResponse;
    chat?: ChatResponse;
    chatEndRef: RefObject<HTMLDivElement>;
}

const ChatMessages: FC<ChatMessagesProps> = (
    {
        onOpenModalWindow,
        handleHoverAction,
        handleLeaveAction,
        visibleHoverAction,
        participant,
        chat,
        chatEndRef,
    }
): ReactElement => {
    const globalClasses = useGlobalStyles();
    const classes = useChatMessagesStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);

    const messages = useSelector(selectChatMessagesItems);
    const isChatMessagesLoading = useSelector(selectIsChatMessagesLoading);
    const isChatMessagesLoaded = useSelector(selectIsChatMessagesLoaded);
    const [message, setMessage] = useState<string>("");
    // Popover
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const popoverId = openPopover ? "simple-popover" : undefined;

    const onSendMessage = (): void => {
        if (message !== "") {
            dispatch(addChatMessage({chatId: chat?.id!, text: textConverter()}));
            setMessage("");
        }
    };

    const addEmoji = (emoji: EmojiData): void => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.replace_mode = 'unified';
        const convertedEmoji = emojiConvertor.replace_colons(emoji.colons!);
        setMessage(message + " " + convertedEmoji);
    };

    const handleOpenPopup = (event: MouseEvent<HTMLDivElement>): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopup = (): void => {
        setAnchorEl(null);
    };

    const textConverter = (): string => {
        const emojiConvertor = new EmojiConvertor();
        emojiConvertor.colons_mode = true;
        return emojiConvertor.replace_unified(message);
    };

    return (
        <>
            {(participant?.user.id === undefined) ? (
                <Paper className={classnames(globalClasses.pageContainer, classes.chatContainer)} variant="outlined">
                    <div className={classes.chatInfoWrapper}>
                        <Typography variant={"h4"} component={"div"}>
                            You don’t have a message selected
                        </Typography>
                        <Typography variant={"subtitle1"} component={"div"}>
                            Choose one from your existing messages, or start a new one.
                        </Typography>
                        <Button
                            onClick={onOpenModalWindow}
                            className={classes.chatInfoButton}
                            variant="contained"
                            color="primary"
                            size="large"
                        >
                            New message
                        </Button>
                    </div>
                </Paper>
            ) : (
                <Paper className={classnames(globalClasses.pageContainer, classes.chatContainer)} variant="outlined">
                    <Paper className={classnames(globalClasses.pageHeader, classes.chatHeader)}>
                        <Avatar
                            className={classes.chatAvatar}
                            src={participant.user.avatar?.src ? participant.user.avatar.src : DEFAULT_PROFILE_IMG}
                        />
                        <div style={{flex: 1}}>
                            <Typography variant="h5">
                                {participant.user.fullName}
                            </Typography>
                            <Typography variant="subtitle2" component={"div"}>
                                @{participant.user.username}
                            </Typography>
                        </div>
                        <div className={classes.iconGroup}>
                            <div className={classes.icon}>
                                <Link to={`/messages/${participant.user.id}/info`}>
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
                        {isChatMessagesLoading ? <Spinner paddingTop={150}/> : (
                            <>
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
                                                                <Typography variant={"h6"} component={"span"}>
                                                                    {message.tweet?.user.fullName}
                                                                </Typography>
                                                                <Typography
                                                                    variant={"subtitle1"}
                                                                    component={"span"}
                                                                    className={classes.tweetUsername}
                                                                >
                                                                    @{message.tweet?.user.username}
                                                                </Typography>
                                                                <Typography
                                                                    variant={"subtitle1"}
                                                                    component={"span"}
                                                                    className={classes.tweetUsername}
                                                                >·</Typography>
                                                                <Typography
                                                                    variant={"subtitle1"}
                                                                    component={"span"}
                                                                    className={classes.tweetUsername}
                                                                >
                                                                    {formatDate(new Date(message.tweet?.dateTime!))}
                                                                </Typography>
                                                            </div>
                                                            <Typography variant={"body1"} component={"span"}>
                                                                {textFormatter(message.tweet?.text)}
                                                            </Typography>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )}
                                            {message.text && (
                                                <div className={classNames(
                                                    classes.myMessage,
                                                    message.tweet ? classes.myMessageWithTweet : classes.myMessageCommon
                                                )}>
                                                    <Typography component={"span"}>
                                                        {textFormatter(message.text)}
                                                    </Typography>
                                                </div>
                                            )}
                                            <div className={classes.myMessageDate}>
                                                <span>{CheckIcon}</span>
                                                <Typography variant={"subtitle2"} component={"span"}>
                                                    {formatChatMessageDate(new Date(message.date))}
                                                </Typography>
                                            </div>
                                        </React.Fragment>
                                    ) : (
                                        <React.Fragment key={message.id}>
                                            <div className={classes.participantContainer}>
                                                <Avatar
                                                    className={classes.participantAvatar}
                                                    src={(myProfile?.id === chat?.participants[1].user.id!) ? (
                                                        (chat?.participants[0].user.avatar?.src) ? (
                                                            chat.participants[0].user.avatar.src
                                                        ) : (
                                                            DEFAULT_PROFILE_IMG
                                                        )
                                                    ) : ((chat?.participants[1].user.avatar?.src) ? (
                                                            chat.participants[1].user.avatar.src
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
                                                                            src={(message.tweet.user.avatar?.src) ? (
                                                                                message.tweet.user.avatar.src
                                                                            ) : (
                                                                                DEFAULT_PROFILE_IMG
                                                                            )}
                                                                        />
                                                                        <Typography variant={"h6"} component={"span"}>
                                                                            {message.tweet.user.fullName}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant={"subtitle1"}
                                                                            component={"span"}
                                                                            className={classes.participantTweetUsername}
                                                                        >
                                                                            @{message.tweet.user.username}
                                                                        </Typography>
                                                                        <Typography
                                                                            variant={"subtitle1"}
                                                                            component={"span"}
                                                                            className={classes.participantTweetUsername}
                                                                        >·</Typography>
                                                                        <Typography
                                                                            variant={"subtitle1"}
                                                                            component={"span"}
                                                                            className={classes.participantTweetUsername}
                                                                        >
                                                                            {formatDate(new Date(message.tweet.dateTime!))}
                                                                        </Typography>
                                                                    </div>
                                                                    <Typography variant={"body1"} component={"span"}>
                                                                        {textFormatter(message.tweet.text)}
                                                                    </Typography>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    )}
                                                    {message.text && (
                                                        <div className={classNames(
                                                            classes.participantMessage,
                                                            message.tweet
                                                                ? classes.participantMessageWithTweet
                                                                : classes.participantMessageCommon
                                                        )}>
                                                            <Typography component={"span"}>
                                                                {textFormatter(message.text)}
                                                            </Typography>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className={classes.participantMessageDate}>
                                                <Typography variant={"subtitle2"} component={"span"}>
                                                    {formatChatMessageDate(new Date(message.date))}
                                                </Typography>
                                            </div>
                                        </React.Fragment>
                                    )
                                ))}
                                <div ref={chatEndRef}/>
                            </>
                        )}
                    </Paper>
                    <>
                        {participant.user.isUserBlocked ? (
                            <Typography variant={"subtitle2"} component={"div"} className={classes.blockedInfoText}>
                                You can no longer send messages to this person.
                                {" "}
                                <MuiLink
                                    href="https://help.twitter.com/using-twitter/direct-messages#faq"
                                    variant="subtitle2"
                                    target="_blank"
                                    rel="noopener"
                                >
                                    Learn more
                                </MuiLink>
                            </Typography>
                        ) : (
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
                                <div className={classes.emojiIcon} onClick={handleOpenPopup}>
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
                                        disabled={message.length === 0}
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
                                <Popover
                                    id={popoverId}
                                    open={openPopover}
                                    anchorEl={anchorEl}
                                    onClose={handleClosePopup}
                                    anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
                                    transformOrigin={{vertical: 'top', horizontal: 'center'}}
                                >
                                    <Picker
                                        title=''
                                        emoji='wave'
                                        onSelect={emojiTag => addEmoji(emojiTag)}
                                        set={'twitter'}/>
                                </Popover>
                            </Paper>
                        )}
                    </>
                </Paper>
            )}
        </>
    );
};

export default ChatMessages;
