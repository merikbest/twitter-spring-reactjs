import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "@material-ui/core";
import classNames from "classnames";

import { useChatMessageStyles } from "./ChatMessageStyles";
import { HOME_TWEET } from "../../../../constants/path-constants";
import { DEFAULT_PROFILE_IMG } from "../../../../constants/url-constants";
import { formatChatMessageDate, formatDate } from "../../../../util/format-date-helper";
import { textFormatter } from "../../../../util/text-formatter";
import { CheckIcon } from "../../../../icons";
import { ChatMessageResponse } from "../../../../types/chat";
import { selectUserDataId } from "../../../../store/ducks/user/selectors";
import {
    selectChatFirstParticipantAvatar,
    selectChatSecondParticipantAvatar,
    selectChatSecondParticipantId
} from "../../../../store/ducks/chat/selectors";

interface ChatMessageProps {
    message: ChatMessageResponse;
    isParticipantMessage: boolean;
}

const ChatMessage: FC<ChatMessageProps> = memo(({ message, isParticipantMessage }): ReactElement => {
    const classes = useChatMessageStyles({ isParticipantMessage });
    const myProfileId = useSelector(selectUserDataId);
    const chatSecondParticipantId = useSelector(selectChatSecondParticipantId);
    const chatFirstParticipantAvatar = useSelector(selectChatFirstParticipantAvatar);
    const chatSecondParticipantAvatar = useSelector(selectChatSecondParticipantAvatar);

    return (
        <>
            <div className={classes.chatMessageContainer}>
                {isParticipantMessage && (
                    <Avatar
                        className={classes.participantAvatar}
                        src={(myProfileId === chatSecondParticipantId) ? (
                            chatFirstParticipantAvatar
                        ) : (
                            chatSecondParticipantAvatar
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
                                                src={message.tweet?.user.avatar ?? DEFAULT_PROFILE_IMG}
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
});

export default ChatMessage;
