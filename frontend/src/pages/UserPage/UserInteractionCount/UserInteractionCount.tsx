import React, { memo, ReactElement, ReactNode } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Skeleton from "@material-ui/lab/Skeleton";
import { List } from "@material-ui/core";

import {
    selectUserProfileId,
    selectUserProfileIsFollower,
    selectUserProfileIsMyProfileBlocked,
    selectUserProfileIsPrivateProfile
} from "../../../store/ducks/userProfile/selectors";
import { USER } from "../../../constants/path-constants";
import { selectUserDataId } from "../../../store/ducks/user/selectors";
import UserFollowersCount from "./UserFollowersCount/UserFollowersCount";
import UserFollowingCount from "./UserFollowingCount/UserFollowingCount";
import { useUserPageStyles } from "../UserPageStyles";

interface LinkToFollowersProps {
    children: ReactNode;
    linkTo: string;
}

const UserInteractionCount = memo((): ReactElement => {
    const classes = useUserPageStyles();
    const myProfileId = useSelector(selectUserDataId);
    const userProfileId = useSelector(selectUserProfileId);
    const isPrivateProfile = useSelector(selectUserProfileIsPrivateProfile);
    const isMyProfileBlocked = useSelector(selectUserProfileIsMyProfileBlocked);
    const isFollower = useSelector(selectUserProfileIsFollower);

    const LinkToFollowers = ({ children, linkTo }: LinkToFollowersProps): JSX.Element => {
        if (isPrivateProfile && userProfileId !== myProfileId && !isFollower) {
            return <div className={classes.followLink}>{children}</div>;
        } else {
            return <Link to={`${USER}/${userProfileId}/${linkTo}`} className={classes.followLink}>{children}</Link>;
        }
    };

    return (
        <>
            {!userProfileId && (
                <div className={classes.skeletonDetails}>
                    <Skeleton component={"span"} variant="text" width={80} />
                    <Skeleton component={"span"} variant="text" width={80} />
                </div>
            )}
            {!isMyProfileBlocked && (
                <List className={classes.details}>
                    <LinkToFollowers linkTo={"following"}>
                        <UserFollowersCount />
                    </LinkToFollowers>
                    <LinkToFollowers linkTo={"followers"}>
                        <UserFollowingCount />
                    </LinkToFollowers>
                </List>
            )}
        </>
    );
});

export default UserInteractionCount;
