import React, {FC, ReactElement, useState} from 'react';
import {Link} from "react-router-dom";
import {Avatar, Button} from "@material-ui/core";
import classNames from "classnames";

import {usePopperUserWindowStyles} from "./PopperUserWindowStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {User} from "../../store/ducks/user/contracts/state";
import {useDispatch, useSelector} from "react-redux";
import {selectUserData} from "../../store/ducks/user/selectors";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {followProfile, unfollowProfile} from "../../store/ducks/userProfile/actionCreators";
import {LockIcon} from "../../icons";

interface PopperUserWindowProps {
    visible?: boolean;
    isTweetComponent?: boolean;
    isTweetImageModal?: boolean;
    user: User;
}

const PopperUserWindow: FC<PopperUserWindowProps> = (
    {
        visible,
        user,
        isTweetComponent,
        isTweetImageModal
    }
): ReactElement | null => {
    const classes = usePopperUserWindowStyles({isTweetComponent});
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [btnText, setBtnText] = useState<string>("Following");
    const follower = myProfile?.followers?.findIndex(follower => follower.id === user.id);

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
        dispatch(followProfile(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
        dispatch(unfollowProfile(user));
    };

    if (!visible) {
        return null;
    }

    return (
        <div
            className={classNames(
                classes.popperUserWindow,
                isTweetComponent && classes.tweetComponent,
                isTweetImageModal && classes.tweetImageModal
            )}
        >
            <div className={classes.headerWrapper}>
                <Link to={`/user/${user?.id}`}>
                    <Avatar
                        className={classes.avatar}
                        alt={`avatar ${user.id}`}
                        src={user.avatar?.src ? user.avatar?.src : DEFAULT_PROFILE_IMG}
                    />
                </Link>
                {(myProfile?.id !== user.id) ? (
                    (follower === -1) ? (
                        <Button
                            className={classes.outlinedButton}
                            onClick={() => handleFollow(user)}
                            color="primary"
                            variant="outlined"
                        >
                            Follow
                        </Button>
                    ) : (
                        <Button
                            className={classes.primaryButton}
                            onMouseOver={() => setBtnText("Unfollow")}
                            onMouseLeave={() => setBtnText("Following")}
                            onClick={() => handleUnfollow(user)}
                            color="primary"
                            variant="contained"
                        >
                            {btnText}
                        </Button>
                    )
                ) : null}
            </div>
            <div className={classes.userInfoWrapper}>
                <Link to={`/user/${user?.id}`}>
                    <div>
                        <span className={classes.fullName}>
                            {user.fullName}
                        </span>
                        {user?.privateProfile && (
                            <span className={classes.lockIcon}>
                                {LockIcon}
                            </span>
                        )}
                    </div>
                </Link>
                <div className={classes.username}>
                    @{user.username}
                </div>
            </div>
            <div className={classes.userInfo}>
                {user.about}
            </div>
            <div className={classes.userFollowersWrapper}>
                <Link to={`/user/${user?.id}/following`} className={classes.followLink}>
                    <span className={classes.followerCount}>
                        {user?.followers?.length ? user?.followers?.length : 0}
                    </span>
                    <span className={classes.followerText}>
                        {"Following"}
                    </span>
                </Link>
                <Link to={`/user/${user?.id}/followers`} className={classes.followLink}>
                    <span className={classes.followerCount}>
                        {user?.following?.length ? user?.following?.length : 0}
                    </span>
                    <span className={classes.followerText}>
                        {"Followers"}
                    </span>
                </Link>
            </div>
        </div>
    );
};

export default PopperUserWindow;
