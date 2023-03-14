import React, { FC, memo, ReactElement, useState } from "react";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import { AnalyticsIcon } from "../../../icons";
import TweetAnalyticsModal from "../../TweetAnalyticsModal/TweetAnalyticsModal";
import { useAnalyticsIconButtonStyles } from "./AnalyticsIconButtonStyles";

interface AnalyticsIconButtonProps {
    tweetUserFullName?: string;
    tweetUserName?: string;
    tweetText?: string;
    isUserCanReply: boolean;
}

const AnalyticsIconButton: FC<AnalyticsIconButtonProps> = memo((
    {
        tweetUserFullName,
        tweetUserName,
        tweetText,
        isUserCanReply
    }
): ReactElement => {
    const classes = useAnalyticsIconButtonStyles();
    const [visibleAnalyticsModalWindow, setVisibleAnalyticsModalWindow] = useState<boolean>(false);

    const onOpenTweetAnalyticsModalWindow = (): void => {
        setVisibleAnalyticsModalWindow(true);
    };

    const onCloseTweetAnalyticsModalWindow = (): void => {
        setVisibleAnalyticsModalWindow(false);
    };

    return (
        <div id={"analytics"} className={classes.replyIcon}>
            <ActionIconButton
                actionText={"Analytics"}
                icon={AnalyticsIcon}
                onClick={onOpenTweetAnalyticsModalWindow}
                disabled={isUserCanReply}
            />
            <TweetAnalyticsModal
                fullName={tweetUserFullName!}
                username={tweetUserName!}
                text={tweetText!}
                visible={visibleAnalyticsModalWindow}
                onClose={onCloseTweetAnalyticsModalWindow}
            />
        </div>
    );
});

export default AnalyticsIconButton;
