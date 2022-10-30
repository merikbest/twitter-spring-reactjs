import React, {FC, memo, ReactElement, useState} from "react";
import {useSelector} from "react-redux";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import {ReplyIcon} from "../../../icons";
import ReplyModal from "../../ReplyModal/ReplyModal";
import {
    selectTweetDateTime,
    selectTweetId,
    selectTweetImages,
    selectTweetText,
    selectTweetUser
} from "../../../store/ducks/tweet/selectors";

interface TweetReplyIconButtonProps {
    classes: ClassNameMap<string>
}

const TweetReplyIconButton: FC<TweetReplyIconButtonProps> = memo(({classes}): ReactElement => {
    const user = useSelector(selectTweetUser);
    const tweetId = useSelector(selectTweetId);
    const text = useSelector(selectTweetText);
    const images = useSelector(selectTweetImages);
    const dateTime = useSelector(selectTweetDateTime);
    const [visibleReplyModalWindow, setVisibleReplyModalWindow] = useState<boolean>(false);

    const onOpenReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(true);
    };

    const onCloseReplyModalWindow = (): void => {
        setVisibleReplyModalWindow(false);
    };

    return (
        <div className={classes.tweetIcon}>
            <ActionIconButton actionText={"Reply"} icon={ReplyIcon} onClick={onOpenReplyModalWindow}/>
            <ReplyModal
                user={user!}
                tweetId={tweetId!}
                text={text!}
                image={images?.[0]}
                dateTime={dateTime!}
                visible={visibleReplyModalWindow}
                onClose={onCloseReplyModalWindow}
            />
        </div>
    );
});

export default TweetReplyIconButton;
