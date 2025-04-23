import React, { FC, memo, ReactElement } from "react";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TweetActivityIcon } from "../../../icons";
import TweetAnalyticsModal from "../../TweetAnalyticsModal/TweetAnalyticsModal";
import { useModalWindow } from "../../../hook/useModalWindow";
import {
    selectTweetInfoText,
    selectTweetInfoUserFullName,
    selectTweetInfoUserUsername
} from "../../../store/ducks/tweetAdditionalInfo/selectors";

const TweetActivityButton: FC = memo((): ReactElement => {
    const text = useSelector(selectTweetInfoText);
    const fullName = useSelector(selectTweetInfoUserFullName);
    const username = useSelector(selectTweetInfoUserUsername);
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const { t } = useTranslation();

    return (
        <>
            <ListItem id="tweetAnalytics" onClick={onOpenModalWindow}>
                <>{TweetActivityIcon}</>
                <Typography variant="body1" component="span">
                    {t("VIEW_TWEET_ACTIVITY", { defaultValue: "View Tweet activity" })}
                </Typography>
            </ListItem>
            <TweetAnalyticsModal
                fullName={fullName!}
                username={username!}
                text={text!}
                visible={visibleModalWindow}
                onClose={onCloseModalWindow}
            />
        </>
    );
});

export default TweetActivityButton;
