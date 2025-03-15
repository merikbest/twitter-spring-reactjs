import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Typography } from "@material-ui/core";

import { useUserTweetsStyles } from "../UserTweetsStyles";
import { selectUserProfileId, selectUserProfileUsername } from "../../../../store/ducks/userProfile/selectors";
import { selectUserDataId } from "../../../../store/ducks/user/selectors";
import { selectIsUserTweetsLoading, selectUserTweetsItems } from "../../../../store/ducks/userTweets/selectors";

const EmptyRepliesTab: FC = (): ReactElement | null => {
    const classes = useUserTweetsStyles();
    const tweets = useSelector(selectUserTweetsItems);
    const isTweetsLoading = useSelector(selectIsUserTweetsLoading);
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const username = useSelector(selectUserProfileUsername);
    const { t } = useTranslation();
    const isMyProfile = userProfileId === myProfileId;

    if (tweets?.length !== 0 || isTweetsLoading) {
        return null;
    }

    return (
        <div className={classes.textWrapper}>
            <Typography variant="h5">
                {isMyProfile
                    ? t("EMPTY_USER_REPLIES_TITLE", { defaultValue: "You haven’t any replies yet" })
                    : t("EMPTY_REPLIES_TITLE", { username, defaultValue: `@${username} hasn’t any replies` })}
            </Typography>
            <Typography variant="subtitle1">
                {isMyProfile
                    ? t("EMPTY_USER_REPLIES_DESCRIPTION", { defaultValue: "When you reply Tweets, they will show up here." })
                    : t("EMPTY_REPLIES_DESCRIPTION", { defaultValue: "When they do, their replies show up here." })}
            </Typography>
        </div>
    );
};

export default EmptyRepliesTab;
