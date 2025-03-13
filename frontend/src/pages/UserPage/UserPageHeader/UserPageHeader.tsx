import React, { FC, memo, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { LockIcon } from "../../../icons";
import PageHeaderWrapper from "../../../components/PageHeaderWrapper/PageHeaderWrapper";
import {
    selectUserProfileFullName,
    selectUserProfileIsPrivateProfile,
    selectUserProfileLikeCount,
    selectUserProfileMediaTweetCount,
    selectUserProfileTweetCount
} from "../../../store/ducks/userProfile/selectors";
import { useUserPageStyles } from "../UserPageStyles";

interface UserPageHeaderProps {
    userTweetsActiveTab: number;
}

const UserPageHeader: FC<UserPageHeaderProps> = memo(({ userTweetsActiveTab }): ReactElement => {
    const classes = useUserPageStyles();
    const fullName = useSelector(selectUserProfileFullName);
    const mediaTweetCount = useSelector(selectUserProfileMediaTweetCount);
    const likeCount = useSelector(selectUserProfileLikeCount);
    const tweetCount = useSelector(selectUserProfileTweetCount);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const { t } = useTranslation();

    return (
        <PageHeaderWrapper backButton>
            <div>
                <Typography variant="h5" component="span">
                    {fullName}
                </Typography>
                {isPrivateProfile && <span className={classes.lockIcon}>{LockIcon}</span>}
                <Typography variant="subtitle2" component="div">
                    {(userTweetsActiveTab === 0 || userTweetsActiveTab === 1) && ((tweetCount === 1)
                        ? t("TWEET_COUNT", { tweetCount, defaultValue: "Tweet" })
                        : t("TWEETS_COUNT", { tweetCount, defaultValue: "Tweets" }))}
                    {userTweetsActiveTab === 2 && ((mediaTweetCount === 1)
                        ? t("PHOTO_AND_VIDEO_COUNT", { mediaTweetCount, defaultValue: "Photo & video" })
                        : t("PHOTOS_AND_VIDEOS_COUNT", { mediaTweetCount, defaultValue: "Photos & videos" }))}
                    {userTweetsActiveTab === 3 && ((likeCount === 1)
                        ? t("LIKE_COUNT", { likeCount, defaultValue: "Like" })
                        : t("LIKES_COUNT", { likeCount, defaultValue: "Likes" }))}
                </Typography>
            </div>
        </PageHeaderWrapper>
    );
});

export default UserPageHeader;
