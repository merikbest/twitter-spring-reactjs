import React, {ComponentType, FC, ReactElement, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import ListItem from "@material-ui/core/ListItem/ListItem";
import classNames from "classnames";
import {compose} from "recompose";

import {User} from "../../../store/ducks/user/contracts/state";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {addUserToBlocklist, followUser, unfollowUser} from "../../../store/ducks/user/actionCreators";
import {useUsersItemStyles} from "./UsersItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {followProfile, processFollowRequest, unfollowProfile} from "../../../store/ducks/userProfile/actionCreators";
import PopperUserWindow from "../../PopperUserWindow/PopperUserWindow";
import UnfollowModal from "../../UnfollowModal/UnfollowModal";
import {LockIcon} from "../../../icons";
import {HoverUserProps, withHoverUser} from "../../../hoc/withHoverUser";
import BlockUserModal from "../../BlockUserModal/BlockUserModal";
import {SnackbarProps, withSnackbar} from "../../../hoc/withSnackbar";
import {HoverActionProps} from "../../../hoc/withHoverAction";
import ActionSnackbar from "../../ActionSnackbar/ActionSnackbar";

export interface UsersItemProps<T> {
    item?: T
}

const UsersItem: FC<UsersItemProps<User> & SnackbarProps & HoverUserProps> = (
    {
        item: user,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper,
        snackBarMessage,
        openSnackBar,
        setSnackBarMessage,
        setOpenSnackBar,
        onCloseSnackBar
    }
): ReactElement => {
    const classes = useUsersItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);
    const [isUserBlocked, setIsUserBlocked] = useState<boolean>(false);
    const [isWaitingForApprove, setIsWaitingForApprove] = useState<boolean>(false);

    const isFollower = myProfile?.followers?.findIndex(follower => follower.id === user?.id) !== -1;
    const isMyProfileBlocked = user?.userBlockedList?.findIndex(blockedUser => blockedUser.id === myProfile?.id) !== -1;

    useEffect(() => {
        const userBlocked = myProfile?.userBlockedList?.findIndex(blockedUser => blockedUser.id === user?.id) !== -1;
        const waitingForApprove = user?.followerRequests?.findIndex(blockedUser => blockedUser.id === myProfile?.id) !== -1;
        setBtnText(waitingForApprove ? ("Pending") : (userBlocked ? "Blocked" : "Following"));
        setIsUserBlocked(userBlocked);
        setIsWaitingForApprove(waitingForApprove);
    }, [myProfile, user]);

    const handleClickOpenUnfollowModal = (): void => {
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    const handleFollow = (user: User): void => {
        if (user?.privateProfile) {
            handleProcessFollowRequest(user);
        } else {
            dispatch(followUser(user));
            dispatch(followProfile(user));
        }
    };

    const handleUnfollow = (user: User): void => {
        if (user?.privateProfile) {
            handleProcessFollowRequest(user);
        } else {
            dispatch(unfollowUser(user));
            dispatch(unfollowProfile(user));
            setVisibleUnfollowModal(false);
        }
    };

    const handleProcessFollowRequest = (user: User): void => {
        dispatch(processFollowRequest(user.id!));
    };

    const onBlockUser = (): void => {
        dispatch(addUserToBlocklist(user?.id!));
        setVisibleBlockUserModal(false);
        setBtnText(isUserBlocked ? "Following" : "Blocked");
        setSnackBarMessage!(`@${user?.username} has been ${isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar!(true);
    };

    const onOpenBlockUserModal = (): void => {
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    return (
        <ListItem className={classes.container}>
            <ListItemAvatar>
                <Avatar
                    alt={`${user?.id}`}
                    src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}
                />
            </ListItemAvatar>
            <div className={classes.userInfo} onMouseEnter={handleHoverPopper} onMouseLeave={handleLeavePopper}>
                <Link to={`/user/${user?.id}`}>
                    <Typography variant={"h6"} display={"inline"}>
                        {user?.fullName}
                    </Typography>
                    {user?.privateProfile && (
                        <span className={classes.lockIcon}>
                            {LockIcon}
                        </span>
                    )}
                    <Typography variant={"subtitle1"} component={"div"}>
                        @{user?.username}
                    </Typography>
                    <PopperUserWindow visible={visiblePopperWindow} user={user!}/>
                </Link>
            </div>
            <div className={classes.buttonWrapper}>
                {(myProfile?.id === user?.id) ? null : (
                    (isMyProfileBlocked) ? null : (
                        (!isFollower) ? (
                            (isUserBlocked) ? (
                                <Button
                                    className={classNames(classes.primaryButton, classes.blockButton)}
                                    onClick={onOpenBlockUserModal}
                                    onMouseOver={() => setBtnText("Unblock")}
                                    onMouseLeave={() => setBtnText("Blocked")}
                                    color="primary"
                                    variant="contained"
                                    size="small"
                                >
                                    {btnText}
                                </Button>
                            ) : (
                                (isWaitingForApprove) ? (
                                    <Button
                                        className={classes.outlinedButton}
                                        onClick={() => handleProcessFollowRequest(user!)}
                                        onMouseOver={() => setBtnText("Cancel")}
                                        onMouseLeave={() => setBtnText("Pending")}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    >
                                        {btnText}
                                    </Button>
                                ) : (
                                    <Button
                                        className={classes.outlinedButton}
                                        onClick={() => handleFollow(user!)}
                                        color="primary"
                                        variant="outlined"
                                        size="small"
                                    >
                                        Follow
                                    </Button>
                                )
                            )
                        ) : (
                            <Button
                                className={classes.primaryButton}
                                onMouseOver={() => setBtnText("Unfollow")}
                                onMouseLeave={() => setBtnText("Following")}
                                onClick={handleClickOpenUnfollowModal}
                                color="primary"
                                variant="contained"
                                size="small"
                            >
                                {btnText}
                            </Button>
                        )
                    )
                )}
            </div>
            <UnfollowModal
                user={user!}
                visible={visibleUnfollowModal}
                onClose={onCloseUnfollowModal}
                handleUnfollow={handleUnfollow}
            />
            <BlockUserModal
                username={user?.username!}
                isUserBlocked={isUserBlocked}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
            <ActionSnackbar
                snackBarMessage={snackBarMessage!}
                openSnackBar={openSnackBar!}
                onCloseSnackBar={onCloseSnackBar!}
            />
        </ListItem>
    );
};

export default compose(withSnackbar, withHoverUser)(UsersItem) as ComponentType<UsersItemProps<User> & SnackbarProps & HoverActionProps>;
