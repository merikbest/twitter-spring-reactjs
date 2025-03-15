import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Button, Typography } from "@material-ui/core";

import { useUserTweetsStyles } from "../UserTweetsStyles";
import { selectUserProfileId, selectUserProfileUsername } from "../../../../store/ducks/userProfile/selectors";
import { selectUserDataId } from "../../../../store/ducks/user/selectors";
import { selectIsUserTweetsLoading, selectUserTweetsItems } from "../../../../store/ducks/userTweets/selectors";
import AddTweetModal from "../../../../components/AddTweetModal/AddTweetModal";
import { useModalWindow } from "../../../../hook/useModalWindow";

const EmptyMediaTab: FC = (): ReactElement | null => {
    const classes = useUserTweetsStyles();
    const tweets = useSelector(selectUserTweetsItems);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const { t } = useTranslation();
    const { visibleModalWindow, onOpenModalWindow, onCloseModalWindow } = useModalWindow();
    const isMyProfile = userProfileId === myProfileId;

    if (tweets?.length !== 0 || isTweetsLoading) {
        return null;
    }

    return (
        <div className={classes.textWrapper}>
            <Typography variant="h5">
                {isMyProfile
                    ? t("EMPTY_USER_MEDIA_TITLE", { defaultValue: "You haven’t Tweeted any photos or videos yet" })
                    : t("EMPTY_MEDIA_TITLE", { username, defaultValue: `@${username} hasn’t Tweeted any photos or videos` })}
            </Typography>
            <Typography variant="subtitle1">
                {isMyProfile
                    ? t("EMPTY_USER_MEDIA_DESCRIPTION", { defaultValue: "When you send Tweets with photos or videos in them, it will show up here." })
                    : t("EMPTY_MEDIA_DESCRIPTION", { defaultValue: "When they do, their media will show up here." })}
            </Typography>
            {isMyProfile && (
                <Button
                    className={classes.button}
                    onClick={onOpenModalWindow}
                    variant="contained"
                    color="primary"
                    size="medium"
                >
                    {t("TWEET_A_PHOTO_OR_VIDEO", { defaultValue: "Tweet a photo or video" })}
                </Button>
            )}
            <AddTweetModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
};

export default EmptyMediaTab;
