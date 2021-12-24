import React, {FC, ReactElement} from 'react';
import {useSelector} from "react-redux";
import {AvatarGroup} from "@material-ui/lab";
import {Avatar, Typography} from "@material-ui/core";

import {useFollowerGroupStyles} from "./FollowerGroupStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {User} from "../../store/ducks/user/contracts/state";
import {selectUserData} from "../../store/ducks/user/selectors";

interface FollowerGroupProps {
    user: User,
    sameFollowers: User[],
}

const FollowerGroup: FC<FollowerGroupProps> = ({user, sameFollowers}): ReactElement => {
    const classes = useFollowerGroupStyles();
    const myProfile = useSelector(selectUserData);

    return (
        <>
            {(user.id !== myProfile?.id) && (
                (sameFollowers.length !== 0) && (
                    <div className={classes.followedTextInfoWrapper}>
                        <AvatarGroup>
                            {sameFollowers.slice(0, 3).map(follower => (
                                <Avatar
                                    alt={follower.username}
                                    src={follower.avatar?.src ? follower.avatar.src : DEFAULT_PROFILE_IMG}
                                />
                            ))}
                        </AvatarGroup>
                        <Typography component={"span"} className={classes.followedTextInfo}>
                            {"Followed by "}
                            {sameFollowers.slice(0, 2).map(follower => `${follower.username}, `)}
                            {(sameFollowers?.length > 2) && `and ${sameFollowers?.length - 2} others you follow`}
                        </Typography>
                    </div>
                )
            )}
        </>
    );
};

export default FollowerGroup;
