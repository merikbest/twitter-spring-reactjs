import React, {FC, memo, ReactElement, useState} from "react";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import {TweetResponse} from "../../../store/types/tweet";
import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import {ReplyIcon} from "../../../icons";
import ReplyModal from "../../ReplyModal/ReplyModal";

interface TweetReplyIconButtonProps {
    classes: ClassNameMap<string>;
    tweet?: TweetResponse;
    isUserCanReply: boolean;
}

const ReplyIconButton: FC<TweetReplyIconButtonProps> = memo(({classes, tweet, isUserCanReply}): ReactElement => {
    const [visibleReplyModalWindow, setVisibleReplyModalWindow] = useState<boolean>(false);
    const image = tweet?.images?.[0];

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
            {(tweet?.repliesCount !== 0) && <span id={"repliesCount"}>{tweet?.repliesCount}</span>}
            <ReplyModal
                user={tweet!.user}
                tweetId={tweet!.id}
                text={tweet!.text}
                image={image}
                dateTime={tweet!.dateTime}
                visible={visibleReplyModalWindow}
                onClose={onCloseReplyModalWindow}
            />
        </div>
    );
});

export default ReplyIconButton;
