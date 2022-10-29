import React, {FC, memo, ReactElement, useState} from "react";
import {ClassNameMap} from "@material-ui/core/styles/withStyles";

import ActionIconButton from "../../ActionIconButton/ActionIconButton";
import {AnalyticsIcon} from "../../../icons";
import TweetAnalyticsModal from "../../TweetAnalyticsModal/TweetAnalyticsModal";
import {TweetResponse} from "../../../store/types/tweet";

interface AnalyticsIconButtonProps {
    classes: ClassNameMap<string>;
    tweet?: TweetResponse;
    isUserCanReply: boolean;
}

const AnalyticsIconButton: FC<AnalyticsIconButtonProps> = memo(({classes, tweet, isUserCanReply}): ReactElement => {
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
                fullName={tweet!.user.fullName}
                username={tweet!.user.username}
                text={tweet!.text}
                visible={visibleAnalyticsModalWindow}
                onClose={onCloseTweetAnalyticsModalWindow}
            />
        </div>
    );
});

export default AnalyticsIconButton;
