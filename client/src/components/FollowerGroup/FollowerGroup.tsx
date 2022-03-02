import React, {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import {AvatarGroup} from "@material-ui/lab";
import {Avatar, Typography} from "@material-ui/core";

import {useFollowerGroupStyles} from "./FollowerGroupStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {selectUserData} from "../../store/ducks/user/selectors";
import {SameFollowerResponse} from "../../store/types/common";
import {UserDetailResponse, UserProfileResponse} from "../../store/types/user";

interface FollowerGroupProps {
    user?: UserProfileResponse | UserDetailResponse,
    sameFollowers?: SameFollowerResponse[],
}

const FollowerGroup: FC<FollowerGroupProps> = ({user, sameFollowers}): ReactElement => {
    const classes = useFollowerGroupStyles();
    const myProfile = useSelector(selectUserData);

    return (
        <>
            {(user?.id !== myProfile?.id) && (
                (sameFollowers?.length !== 0) ? (
                    <div className={classes.followedTextInfoWrapper}>
                        <Link to={`/user/followers_you_follow/${user?.id}`}>
                            <AvatarGroup>
                                {sameFollowers?.slice(0, 3).map(follower => (
                                    <Avatar
                                        key={follower.id}
                                        alt={follower.username}
                                        src={follower.avatar?.src ? follower.avatar.src : DEFAULT_PROFILE_IMG}
                                    />
                                ))}
                            </AvatarGroup>
                            <Typography variant={"subtitle2"} component={"span"} className={classes.followedTextInfo}>
                                {"Followed by "}
                                {sameFollowers?.slice(0, 2).map((follower, index, array) => (
                                    `${follower.username}${(array.length !== index + 1) ? "," : ""} `
                                ))}
                                {(sameFollowers?.length! > 2) && `and ${sameFollowers?.length! - 2} others you follow`}
                            </Typography>
                        </Link>
                    </div>
                ) : (
                    (user?.id !== myProfile?.id) && (
                        <Typography variant={"subtitle2"} component={"div"} className={classes.noFollowedTextInfo}>
                            Not followed by anyone you’re following
                        </Typography>
                    )
                )
            )}
        </>
    );
};

export default FollowerGroup;
