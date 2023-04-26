import React, { memo, ReactElement } from "react";
import { useSelector } from "react-redux";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { ReplyIcon } from "../../../icons";
import ReplyModal from "../../ReplyModal/ReplyModal";
import {
    selectTweetDateTime,
    selectTweetId,
    selectTweetImages,
    selectTweetReplyType,
    selectTweetText,
    selectTweetUser,
    selectTweetUserId
} from "../../../store/ducks/tweet/selectors";
import { ReplyType } from "../../../types/common";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import { useTweetReplyIconButtonStyles } from "./TweetReplyIconButtonStyles";
import { useModalWindow } from "../../../hook/useModalWindow";

const TweetReplyIconButton = memo((): ReactElement => {
    const myProfileId = useSelector(selectUserDataId);
    const tweetUserId = useSelector(selectTweetUserId);
    const user = useSelector(selectTweetUser);
    const tweetId = useSelector(selectTweetId);
    const text = useSelector(selectTweetText);
    const images = useSelector(selectTweetImages);
    const dateTime = useSelector(selectTweetDateTime);
    const tweetReplyType = useSelector(selectTweetReplyType);
    const isUserCanReply = (tweetReplyType === ReplyType.MENTION) && (myProfileId !== tweetUserId);
    const classes = useTweetReplyIconButtonStyles({ isUserCanReply });
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <div className={classes.tweetIcon}>
            <ActionIconButton
                actionText={"Reply"}
                icon={ReplyIcon}
                onClick={onOpenModalWindow}
                disabled={isUserCanReply}
            />
            <ReplyModal
                user={user!}
                tweetId={tweetId!}
                text={text!}
                image={images?.[0]}
                dateTime={dateTime!}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </div>
    );
});

export default TweetReplyIconButton;
