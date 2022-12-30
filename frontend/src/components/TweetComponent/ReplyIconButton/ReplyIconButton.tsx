import React, {FC, memo, ReactElement, useState} from "react";

import {UserTweetResponse} from "../../../store/types/tweet";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import {ReplyIcon} from "../../../icons";
import ReplyModal from "../../ReplyModal/ReplyModal";
import {Image} from "../../../store/types/common";
import {useReplyIconButtonStyles} from "./ReplyIconButtonStyles";

interface TweetReplyIconButtonProps {
    tweetId?: number;
    text?: string;
    image?: Image;
    dateTime?: string;
    tweetUser?: UserTweetResponse;
    repliesCount?: number;
    isUserCanReply: boolean;
}

const ReplyIconButton: FC<TweetReplyIconButtonProps> = memo((
    {
        tweetId,
        text,
        image,
        dateTime,
        tweetUser,
        repliesCount,
        isUserCanReply
    }
): ReactElement => {
    const classes = useReplyIconButtonStyles({isUserCanReply});
    const [visibleReplyModalWindow, setVisibleReplyModalWindow] = useState<boolean>(false);

    const onOpenReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(true);
    };

    const onCloseReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(false);
    };

    return (
        <div className={classes.replyIcon}>
            <ActionIconButton
                actionText={"Reply"}
                icon={ReplyIcon}
                onClick={onOpenReplyModalWindow}
                disabled={isUserCanReply}
            />
            {(repliesCount !== 0) && <span id={"repliesCount"}>{repliesCount}</span>}
            <ReplyModal
                user={tweetUser!}
                tweetId={tweetId!}
                text={text!}
                image={image}
                dateTime={dateTime!}
                visible={visibleReplyModalWindow}
                onClose={onCloseReplyModalWindow}
            />
        </div>
    );
});

export default ReplyIconButton;
