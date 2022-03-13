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

import {selectUserData} from "../../store/ducks/user/selectors";
import {
    followUser,
    processFollowRequest,
    processUserToBlocklist,
    unfollowUser
} from "../../store/ducks/user/actionCreators";
import {useUsersItemStyles} from "./UsersItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import PopperUserWindow from "../PopperUserWindow/PopperUserWindow";
import UnfollowModal from "../UnfollowModal/UnfollowModal";
import {LockIcon} from "../../icons";
import {HoverUserProps, withHoverUser} from "../../hoc/withHoverUser";
import BlockUserModal from "../BlockUserModal/BlockUserModal";
import {SnackbarProps, withSnackbar} from "../../hoc/withSnackbar";
import {HoverActionProps} from "../../hoc/withHoverAction";
import ActionSnackbar from "../ActionSnackbar/ActionSnackbar";
import {useGlobalStyles} from "../../util/globalClasses";
import {UserResponse} from "../../store/types/user";

export interface UsersItemProps<T> {
    item?: T,
    size?: UserItemSize
}

export enum UserItemSize {
    SMALL = "SMALL",
    MEDIUM = "MEDIUM",
    LARGE = "LARGE",
}

const UsersItem: FC<UsersItemProps<UserResponse> & SnackbarProps & HoverUserProps> = (
    {
        item: user,
        size,
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
    const classes = useUsersItemStyles({size});
    const globalClasses = useGlobalStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);
    const [visibleBlockUserModal, setVisibleBlockUserModal] = useState<boolean>(false);

    useEffect(() => {
        setBtnText(user?.isWaitingForApprove ? ("Pending") : (user?.isUserBlocked ? "Blocked" : "Following"));
    }, [myProfile, user]);

    const handleClickOpenUnfollowModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    const cancelFollow = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        handleProcessFollowRequest(user!);
    };

    const handleFollow = (event: React.MouseEvent<HTMLButtonElement>, user: UserResponse): void => {
        event.preventDefault();

        if (user?.isPrivateProfile) {
            handleProcessFollowRequest(user);
        } else {
            dispatch(followUser({userId: user?.id!}));
            // dispatch(followProfile(user));
        }
    };

    const handleUnfollow = (user: UserResponse): void => {
        if (user?.isPrivateProfile) {
            handleProcessFollowRequest(user);
        } else {
            dispatch(unfollowUser({userId: user?.id!}));
            // dispatch(unfollowProfile(user));
            setVisibleUnfollowModal(false);
        }
    };

    const handleProcessFollowRequest = (user: UserResponse): void => {
        dispatch(processFollowRequest(user.id!));
    };

    const onBlockUser = (): void => {
        dispatch(processUserToBlocklist({userId: user?.id!}));
        setVisibleBlockUserModal(false);
        setBtnText(user?.isUserBlocked ? "Following" : "Blocked");
        setSnackBarMessage!(`@${user?.username} has been ${user?.isUserBlocked ? "unblocked" : "blocked"}.`);
        setOpenSnackBar!(true);
    };

    const onOpenBlockUserModal = (event: React.MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();
        setVisibleBlockUserModal(true);
    };

    const onCloseBlockUserModal = (): void => {
        setVisibleBlockUserModal(false);
    };

    return (
        <>
            <Link to={`/profile/${user?.id}`} className={globalClasses.link}>
                <ListItem className={classes.container}>
                    <ListItemAvatar>
                        <Avatar
                            className={globalClasses.avatar}
                            alt={`${user?.id}`}
                            src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}
                        />
                    </ListItemAvatar>
                    <div
                        className={classes.userInfo}
                        onMouseEnter={() => handleHoverPopper!(user?.id!)}
                        onMouseLeave={handleLeavePopper}
                    >
                        <Typography variant={"h6"} display={"inline"}>
                            {user?.fullName}
                        </Typography>
                        {user?.isPrivateProfile && (
                            <span className={classes.lockIcon}>
                                {LockIcon}
                            </span>
                        )}
                        <Typography variant={"subtitle1"} component={"div"}>
                            @{user?.username}
                        </Typography>
                        {(user?.isMyProfileBlocked) ? null : (
                            (size !== UserItemSize.SMALL) && (
                                <Typography variant={"body1"} display="block">
                                    {user?.about}
                                </Typography>
                            )
                        )}
                        <PopperUserWindow visible={visiblePopperWindow}/>
                    </div>
                    <div className={classes.buttonWrapper}>
                        {(myProfile?.id === user?.id) ? null : (
                            (user?.isMyProfileBlocked) ? null : (
                                (!user?.isFollower) ? (
                                    (user?.isUserBlocked) ? (
                                        <Button
                                            className={classNames(classes.containedButton, classes.blockButton)}
                                            onClick={(event) => onOpenBlockUserModal(event)}
                                            onMouseOver={() => setBtnText("Unblock")}
                                            onMouseLeave={() => setBtnText("Blocked")}
                                            color="primary"
                                            variant="contained"
                                            size="small"
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
                                                size="small"
                                            >
                                                {btnText}
                                            </Button>
                                        ) : (
                                            <Button
                                                className={classes.outlinedButton}
                                                onClick={(event) => handleFollow(event, user!)}
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
                                        className={classes.containedButton}
                                        onClick={(event) => handleClickOpenUnfollowModal(event)}
                                        onMouseOver={() => setBtnText("Unfollow")}
                                        onMouseLeave={() => setBtnText("Following")}
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
                </ListItem>
            </Link>
            <UnfollowModal
                user={user!}
                visible={visibleUnfollowModal}
                onClose={onCloseUnfollowModal}
                handleUnfollow={handleUnfollow}
            />
            <BlockUserModal
                username={user?.username!}
                isUserBlocked={user?.isUserBlocked!}
                visible={visibleBlockUserModal}
                onClose={onCloseBlockUserModal}
                onBlockUser={onBlockUser}
            />
            <ActionSnackbar
                snackBarMessage={snackBarMessage!}
                openSnackBar={openSnackBar!}
                onCloseSnackBar={onCloseSnackBar!}
            />
        </>
    );
};

export default compose(withSnackbar, withHoverUser)(UsersItem) as ComponentType<UsersItemProps<UserResponse> & SnackbarProps & HoverActionProps>;
