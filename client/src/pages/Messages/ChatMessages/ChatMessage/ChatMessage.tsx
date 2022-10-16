import React, {FC, ReactElement} from 'react';
import {Link} from "react-router-dom";
import {Avatar, Typography} from "@material-ui/core";
import classNames from "classnames";

import {useChatMessageStyles} from "./ChatMessageStyles";
import {HOME_TWEET} from "../../../../util/pathConstants";
import {DEFAULT_PROFILE_IMG} from "../../../../util/url";
import {formatChatMessageDate, formatDate} from "../../../../util/formatDate";
import {textFormatter} from "../../../../util/textFormatter";
import {CheckIcon} from "../../../../icons";
import {ChatMessageResponse, ChatResponse} from "../../../../store/types/chat";

interface ChatMessageProps {
    message: ChatMessageResponse;
    isParticipantMessage: boolean;
    chat?: ChatResponse;
    myProfileId?: number;
}

const ChatMessage: FC<ChatMessageProps> = ({message, chat, isParticipantMessage, myProfileId}): ReactElement => {
    const classes = useChatMessageStyles({isParticipantMessage});

    return (
        <>
            <div className={classes.chatMessageContainer}>
                {isParticipantMessage && (
                    <Avatar
                        className={classes.participantAvatar}
                        src={(myProfileId === chat?.participants[1].user.id!) ? (
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
                )}
                <div>
                    {message.tweet && (
                        message.tweet.isDeleted ? (
                            <div>Tweet deleted</div>
                        ) : (
                            <div className={classes.tweetContainer}>
                                <Link to={`${HOME_TWEET}/${message.tweet.id}`}>
                                    <div className={classes.tweetWrapper}>
                                        <div className={classes.tweetUserInfoWrapper}>
                                            <Avatar
                                                className={classes.tweetAvatar}
                                                src={(message.tweet?.user.avatar?.src) ? (
                                                    message.tweet?.user.avatar?.src
                                                ) : (
                                                    DEFAULT_PROFILE_IMG)
                                                }
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
                        )
                    )}
                    {message.text && (
                        <div className={classNames(
                            classes.myMessage,
                            message.tweet
                                ? classes.myMessageWithTweet
                                : classes.myMessageCommon
                        )}>
                            <Typography component={"span"}>
                                {textFormatter(message.text)}
                            </Typography>
                        </div>
                    )}
                </div>
            </div>
            <div className={classes.myMessageDate}>
                {!isParticipantMessage && <span>{CheckIcon}</span>}
                <Typography variant={"subtitle2"} component={"span"}>
                    {formatChatMessageDate(new Date(message.date))}
                </Typography>
            </div>
        </>
    );
};

export default ChatMessage;
