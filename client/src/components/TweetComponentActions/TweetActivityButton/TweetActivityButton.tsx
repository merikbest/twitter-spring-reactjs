import React, {FC, memo, ReactElement, useState} from "react";
import {ListItem, Typography} from "@material-ui/core";

import {TweetActivityIcon} from "../../../icons";
import TweetAnalyticsModal from "../../TweetAnalyticsModal/TweetAnalyticsModal";

interface TweetActivityButtonProps {
    fullName: string;
    username: string;
    text: string;
}

const TweetActivityButton: FC<TweetActivityButtonProps> = memo(({fullName, username, text}): ReactElement => {
    const [visibleAnalyticsModalWindow, setVisibleAnalyticsModalWindow] = useState<boolean>(false);

    const onOpenTweetAnalyticsModalWindow = (): void => {
        setVisibleAnalyticsModalWindow(true);
    };

    const onCloseTweetAnalyticsModalWindow = (): void => {
        setVisibleAnalyticsModalWindow(false);
    };

    return (
        <>
            <ListItem id={"tweetAnalytics"} onClick={onOpenTweetAnalyticsModalWindow}>
                <>{TweetActivityIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    View Tweet activity
                </Typography>
            </ListItem>
            <TweetAnalyticsModal
                fullName={fullName}
                username={username}
                text={text}
                visible={visibleAnalyticsModalWindow}
                onClose={onCloseTweetAnalyticsModalWindow}
            />
        </>
    );
});

export default TweetActivityButton;
