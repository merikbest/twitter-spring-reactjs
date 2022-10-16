import React, {FC, MouseEvent, ReactElement, RefObject, useState} from 'react';
import {IconButton, Paper, Popover} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import classnames from "classnames";
import {EmojiData, Picker} from "emoji-mart";
import EmojiConvertor from "emoji-js";

import {useChatMessagesStyles} from "./ChatMessagesStyles";
import {useGlobalStyles} from "../../../util/globalClasses";
import {EmojiIcon, GifIcon, MediaIcon, SendMessageIcon} from "../../../icons";
import HoverAction from "../../../components/HoverAction/HoverAction";
import {MessageInput} from "../MessageInput/MessageInput";
import {MessagesAction, VisibleActions} from "../Messages";
import {ChatResponse, ParticipantResponse} from "../../../store/types/chat";
import {addChatMessage} from "../../../store/ducks/chatMessages/actionCreators";
import {selectChatMessagesItems, selectIsChatMessagesLoading} from "../../../store/ducks/chatMessages/selectors";
import {selectUserData} from "../../../store/ducks/user/selectors";
import Spinner from "../../../components/Spinner/Spinner";
import EmptyChatMessages from "./EmptyChatMessages/EmptyChatMesseges";
import ChatHeader from "./ChatHeader/ChatHeader";
import ChatMessage from "./ChatMessage/ChatMessage";
import ChatUserBlocked from "./ChatUserBlocked/ChatUserBlocked";

interface ChatMessagesProps {
    onOpenModalWindow: () => void;
    handleHoverAction: (action: MessagesAction) => void;
    handleLeaveAction: () => void;
    visibleHoverAction: VisibleActions;
    participant?: ParticipantResponse;
    chat?: ChatResponse;
    chatEndRef: RefObject<HTMLDivElement> | null;
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
        <Paper className={classnames(globalClasses.pageContainer, classes.chatContainer)} variant="outlined">
            {(!participant?.user.id) ? (
                <EmptyChatMessages onOpenModalWindow={onOpenModalWindow}/>
            ) : (
                <>
                    <ChatHeader
                        participant={participant}
                        handleHoverAction={handleHoverAction}
                        handleLeaveAction={handleLeaveAction}
                        visibleHoverAction={visibleHoverAction}
                    />
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
                                            actionText={"Media"}
                                            positionTop
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
                                            actionText={"GIF"}
                                            positionTop
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
                                <div
                                    id={"handleOpenPopup"}
                                    className={classes.emojiIcon}
                                    onClick={handleOpenPopup}
                                >
                                    <IconButton
                                        onMouseEnter={() => handleHoverAction(MessagesAction.EMOJI)}
                                        onMouseLeave={handleLeaveAction}
                                        color="primary"
                                    >
                                        <span>{EmojiIcon}</span>
                                        <HoverAction
                                            visible={visibleHoverAction.visibleEmojiAction}
                                            actionText={"Emoji"}
                                            positionTop
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
                                            actionText={"Send"}
                                            positionTop
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
                </>
            )}
        </Paper>
    );
};

export default ChatMessages;
