import React, { FC, ReactElement } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AvatarGroup } from "@material-ui/lab";
import { Avatar, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { useFollowerGroupStyles } from "./FollowerGroupStyles";
import { DEFAULT_PROFILE_IMG } from "../../constants/url-constants";
import { selectUserDataId } from "../../store/ducks/user/selectors";
import { SameFollowerResponse } from "../../types/common";
import { USER_FOLLOWERS_YOU_FOLLOW } from "../../constants/path-constants";

interface FollowerGroupProps {
    userId: number;
    sameFollowers?: SameFollowerResponse[];
}

const FollowerGroup: FC<FollowerGroupProps> = ({ userId, sameFollowers = [] }): ReactElement | null => {
    const classes = useFollowerGroupStyles();
    const myProfileId = useSelector(selectUserDataId);
    const { t } = useTranslation();
    const followersCount = sameFollowers.length;
    const [follower1, follower2, follower3] = sameFollowers;

    const getTranslationKey = (): string => {
        switch (followersCount) {
            case 1: return "FOLLOWED_BY_USER";
            case 2: return "FOLLOWED_BY_TWO_USERS";
            case 3: return "FOLLOWED_BY_THREE_USERS";
            default: return "FOLLOWED_BY_MORE_THEN_THREE_USERS";
        }
    };

    const getDefaultText = (): string => {
        switch (followersCount) {
            case 1: return `Followed by ${follower1.username}`;
            case 2: return `Followed by ${follower1.username} and ${follower2.username}`;
            case 3: return `Followed by ${follower1.username}, ${follower2.username} and ${follower3.username}`;
            default: return `Followed by ${follower1.username}, ${follower2.username} and ${followersCount - 2} others you follow`;
        }
    };

    if (userId === myProfileId) {
        return null;
    }

    if (sameFollowers.length === 0) {
        return (
            <Typography variant="subtitle2" component="div" className={classes.noFollowedTextInfo}>
                {t("NOT_FOLLOWED_BY_ANYONE", { defaultValue: "Not followed by anyone you’re following" })}
            </Typography>
        );
    }

    return (
        <div className={classes.followedTextInfoWrapper}>
            <Link to={`${USER_FOLLOWERS_YOU_FOLLOW}/${userId}`}>
                <AvatarGroup>
                    {sameFollowers?.slice(0, 3).map(follower => (
                        <Avatar
                            key={follower.id}
                            alt={follower.username}
                            src={follower.avatar ?? DEFAULT_PROFILE_IMG}
                        />
                    ))}
                </AvatarGroup>
                <Typography variant={"subtitle2"} component={"span"} className={classes.followedTextInfo}>
                    {t(getTranslationKey(), {
                        follower1: follower1?.username,
                        follower2: follower2?.username,
                        follower3: follower3?.username,
                        followerSize: followersCount - 2,
                        defaultValue: getDefaultText()
                    })}
                </Typography>
            </Link>
        </div>
    );
};

export default FollowerGroup;
