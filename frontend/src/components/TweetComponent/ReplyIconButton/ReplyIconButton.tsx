import React, { FC, memo, ReactElement } from "react";

import { UserTweetResponse } from "../../../types/tweet";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { ReplyIcon } from "../../../icons";
import ReplyModal from "../../ReplyModal/ReplyModal";
import { Image } from "../../../types/common";
import { useReplyIconButtonStyles } from "./ReplyIconButtonStyles";
import { useModalWindow } from "../../../hook/useModalWindow";

interface TweetReplyIconButtonProps {
    tweetId?: number;
    text?: string;
    image?: Image;
    createdAt?: string;
    tweetAuthor?: UserTweetResponse;
    repliesCount?: number;
    isUserCanReply: boolean;
}

const ReplyIconButton: FC<TweetReplyIconButtonProps> = memo((
    {
        tweetId,
        text,
        image,
        createdAt,
        tweetAuthor,
        repliesCount,
        isUserCanReply
    }
): ReactElement => {
    const classes = useReplyIconButtonStyles({ isUserCanReply });
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <div className={classes.replyIcon}>
            <ActionIconButton
                actionText={"Reply"}
                icon={ReplyIcon}
                onClick={onOpenModalWindow}
                disabled={isUserCanReply}
            />
            {(repliesCount !== 0) && (
                <span id={"repliesCount"} className={classes.repliesCount}>
                    {repliesCount}
                </span>
            )}
            <ReplyModal
                author={tweetAuthor!}
                tweetId={tweetId!}
                text={text!}
                image={image}
                createdAt={createdAt!}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </div>
    );
});

export default ReplyIconButton;
