import React, { FC, memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";

import { TweetActivityIcon } from "../../../icons";
import TweetAnalyticsModal from "../../TweetAnalyticsModal/TweetAnalyticsModal";
import { useModalWindow } from "../../../hook/useModalWindow";

interface TweetActivityButtonProps {
    fullName: string;
    username: string;
    text: string;
}

const TweetActivityButton: FC<TweetActivityButtonProps> = memo(({ fullName, username, text }): ReactElement => {
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();

    return (
        <>
            <ListItem id={"tweetAnalytics"} onClick={onOpenModalWindow}>
                <>{TweetActivityIcon}</>
                <Typography variant={"body1"} component={"span"}>
                    View Tweet activity
                </Typography>
            </ListItem>
            <TweetAnalyticsModal
                fullName={fullName}
                username={username}
                text={text}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </>
    );
});

export default TweetActivityButton;
