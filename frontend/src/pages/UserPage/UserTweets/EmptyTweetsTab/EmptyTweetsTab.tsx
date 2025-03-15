import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Button, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { selectUserProfileId, selectUserProfileUsername } from "../../../../store/ducks/userProfile/selectors";
import { useUserTweetsStyles } from "../UserTweetsStyles";
import { selectUserDataId } from "../../../../store/ducks/user/selectors";
import { selectIsUserTweetsLoading, selectUserTweetsItems } from "../../../../store/ducks/userTweets/selectors";
import { useModalWindow } from "../../../../hook/useModalWindow";
import AddTweetModal from "../../../../components/AddTweetModal/AddTweetModal";

const EmptyTweetsTab: FC = (): ReactElement | null => {
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
                    ? t("EMPTY_USER_TWEETS_TITLE", { defaultValue: "You haven’t any Tweets yet" })
                    : t("EMPTY_TWEETS_TITLE", { username, defaultValue: `@${username} hasn’t any Tweets` })}
            </Typography>
            <Typography variant="subtitle1">
                {isMyProfile
                    ? t("EMPTY_USER_TWEETS_DESCRIPTION", { defaultValue: "When you send Tweets, they will show up here." })
                    : t("EMPTY_TWEETS_DESCRIPTION", { defaultValue: "When they do, their Tweets show up here." })}
            </Typography>
            {isMyProfile && (
                <Button
                    className={classes.button}
                    onClick={onOpenModalWindow}
                    variant="contained"
                    color="primary"
                    size="medium"
                >
                    {t("SEND_TWEET", { defaultValue: "Send Tweet" })}
                </Button>
            )}
            <AddTweetModal visible={visibleModalWindow} onClose={onCloseModalWindow} />
        </div>
    );
};

export default EmptyTweetsTab;
