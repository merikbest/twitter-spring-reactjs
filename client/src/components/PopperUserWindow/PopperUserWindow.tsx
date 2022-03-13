import React, {FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {Avatar, Button, Typography} from "@material-ui/core";
import classNames from "classnames";

import {usePopperUserWindowStyles} from "./PopperUserWindowStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {selectUserData} from "../../store/ducks/user/selectors";
import {
    processUserToBlocklist,
    followUser,
    unfollowUser,
    processFollowRequest
} from "../../store/ducks/user/actionCreators";
import {LockIcon} from "../../icons";
import FollowerGroup from "../FollowerGroup/FollowerGroup";
import {SnackbarProps, withSnackbar} from "../../hoc/withSnackbar";
import ActionSnackbar from "../ActionSnackbar/ActionSnackbar";
import {UserDetailResponse} from "../../store/types/user";
import {selectUserDetailItem} from "../../store/ducks/userDetail/selectors";

interface PopperUserWindowProps {
    visible?: boolean;
    isTweetComponent?: boolean;
    isTweetImageModal?: boolean;
}

const PopperUserWindow: FC<PopperUserWindowProps & SnackbarProps> = (
    {
        visible,
        isTweetComponent,
        isTweetImageModal,
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement | null => {
    const classes = usePopperUserWindowStyles({isTweetComponent});
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const user = useSelector(selectUserDetailItem);
    const [btnText, setBtnText] = useState<string>("Following");

    useEffect(() => {
        if (visible) {
            setBtnText(user?.isWaitingForApprove ? ("Pending") : (user?.isUserBlocked ? "Blocked" : "Following"));
        }
    }, [visible, user, myProfile]);

    const handleFollow = (event: React.MouseEvent<HTMLButtonElement>, user: UserDetailResponse): void => {
        event.preventDefault();
        event.stopPropagation();

        if (user?.isPrivateProfile) {
            handleProcessFollowRequest(user);
        } else {
            dispatch(followUser({userId: user?.id!}));
        }
    };

    const handleUnfollow = (event: React.MouseEvent<HTMLButtonElement>, user: UserDetailResponse): void => {
        event.preventDefault();
        event.stopPropagation();

        if (user?.isPrivateProfile) {
            handleProcessFollowRequest(user);
        } else {
            dispatch(unfollowUser({userId: user?.id!}));
        }
    };

    const cancelFollow = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        handleProcessFollowRequest(user!);
    };

    const handleProcessFollowRequest = (user: UserDetailResponse): void => {
        dispatch(processFollowRequest(user.id!));
    };

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({userId: user?.id!}));
        setBtnText(user?.isUserBlocked ? "Following" : "Blocked");
        setSnackBarMessage!(`@${user?.username} has been ${user?.isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar!(true);
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
                <Link to={`/profile/${user?.id}`}>
                    <Avatar
                        className={classes.avatar}
                        alt={`avatar ${user?.id}`}
                        src={user?.avatar?.src ? user?.avatar?.src : DEFAULT_PROFILE_IMG}
                    />
                </Link>
                {(myProfile?.id === user?.id) ? null : (
                    (user?.isMyProfileBlocked) ? null : (
                        (!user?.isFollower) ? (
                            (user?.isUserBlocked) ? (
                                <Button
                                    className={classNames(classes.containedButton, classes.blockButton)}
                                    onClick={onBlockUser}
                                    onMouseOver={() => setBtnText("Unblock")}
                                    onMouseLeave={() => setBtnText("Blocked")}
                                    color="primary"
                                    variant="contained"
                                >
                                    {btnText}
                                </Button>
                            ) : (
                                (user?.isWaitingForApprove) ? (
                                    <Button
                                        className={classes.outlinedButton}
                                        onClick={(event) => cancelFollow(event)}
                                        onMouseOver={() => setBtnText("Cancel")}
                                        onMouseLeave={() => setBtnText("Pending")}
                                        color="primary"
                                        variant="outlined"
                                    >
                                        {btnText}
                                    </Button>
                                ) : (
                                    <Button
                                        className={classes.outlinedButton}
                                        onClick={(event) => handleFollow(event, user!)}
                                        color="primary"
                                        variant="outlined"
                                    >
                                        Follow
                                    </Button>
                                )
                            )
                        ) : (
                            <Button
                                className={classes.containedButton}
                                onClick={(event) => handleUnfollow(event, user!)}
                                onMouseOver={() => setBtnText("Unfollow")}
                                onMouseLeave={() => setBtnText("Following")}
                                color="primary"
                                variant="contained"
                            >
                                {btnText}
                            </Button>
                        )
                    )
                )}
            </div>
            <div className={classes.userInfoWrapper}>
                <Link to={`/profile/${user?.id}`}>
                    <div>
                        <Typography variant={"h6"} component={"span"}>
                            {user?.fullName}
                        </Typography>
                        {user?.isPrivateProfile && (
                            <span className={classes.lockIcon}>
                                {LockIcon}
                            </span>
                        )}
                    </div>
                </Link>
                <Typography variant={"subtitle1"} component={"div"}>
                    @{user?.username}
                </Typography>
            </div>
            {(user?.isMyProfileBlocked) ? null : (
                <>
                    <Typography variant={"body1"} component={"div"} className={classes.userInfo}>
                        {user?.about}
                    </Typography>
                    <div className={classes.userFollowersWrapper}>
                        <Link to={`/user/${user?.id}/following`} className={classes.followLink}>
                            <Typography variant={"h6"} component={"span"}>
                                {user?.followersSize}
                            </Typography>
                            <Typography variant={"subtitle1"} component={"span"}>
                                {"Following"}
                            </Typography>
                        </Link>
                        <Link to={`/user/${user?.id}/followers`} className={classes.followLink}>
                            <Typography variant={"h6"} component={"span"}>
                                {user?.followingSize}
                            </Typography>
                            <Typography variant={"subtitle1"} component={"span"}>
                                {"Followers"}
                            </Typography>
                        </Link>
                    </div>
                    {user?.isPrivateProfile ? null : (
                        <FollowerGroup user={user} sameFollowers={user?.sameFollowers}/>
                    )}
                </>
            )}
            <ActionSnackbar
                snackBarMessage={snackBarMessage!}
                openSnackBar={openSnackBar!}
                onCloseSnackBar={onCloseSnackBar!}
            />
        </div>
    );
};

export default withSnackbar(PopperUserWindow);
