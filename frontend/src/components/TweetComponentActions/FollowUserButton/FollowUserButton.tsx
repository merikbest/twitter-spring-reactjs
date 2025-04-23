import React, { FC, memo, ReactElement } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ListItem, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import { FollowIcon, UnfollowIcon } from "../../../icons";
import { followUser, unfollowUser } from "../../../store/ducks/user/actionCreators";
import {
    selectTweetInfoUserId,
    selectTweetInfoUserIsFollower,
    selectTweetInfoUserUsername
} from "../../../store/ducks/tweetAdditionalInfo/selectors";

interface FollowUserButtonProps {
    tweetId: number;
}

const FollowUserButton: FC<FollowUserButtonProps> = memo(({ tweetId }): ReactElement => {
    const dispatch = useDispatch();
    const userId = useSelector(selectTweetInfoUserId);
    const username = useSelector(selectTweetInfoUserUsername);
    const isFollower = useSelector(selectTweetInfoUserIsFollower);
    const { t } = useTranslation();

    const handleFollow = (): void => {
        if (isFollower) {
            dispatch(unfollowUser({ userId: userId!, tweetId }));
        } else {
            dispatch(followUser({ userId: userId!, tweetId }));
        }
    };

    return (
        <ListItem id="handleFollow" onClick={handleFollow}>
            <>{isFollower ? UnfollowIcon : FollowIcon}</>
            <Typography variant="body1" component="span">
                {isFollower
                    ? t("UNFOLLOW_USER", { username, defaultValue: `Unfollow @${username}` })
                    : t("FOLLOW_USER", {  username, defaultValue: `Follow @${username}` })}
            </Typography>
        </ListItem>
    );
});

export default FollowUserButton;
