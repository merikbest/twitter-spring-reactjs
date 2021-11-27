import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import ListItem from "@material-ui/core/ListItem/ListItem";

import {User} from "../../../store/ducks/user/contracts/state";
import {selectUserData} from "../../../store/ducks/user/selectors";
import {followUser, unfollowUser} from "../../../store/ducks/user/actionCreators";
import {useUsersItemStyles} from "./UsersItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../../util/url";
import {followProfile, unfollowProfile} from "../../../store/ducks/userProfile/actionCreators";
import PopperUserWindow from "../../PopperUserWindow/PopperUserWindow";
import UnfollowModal from "../../UnfollowModal/UnfollowModal";
import {LockIcon} from "../../../icons";
import {HoverUserProps, withHoverUser} from "../../../hoc/withHoverUser";

export interface UsersItemProps<T> {
    item?: T
}

const UsersItem: FC<UsersItemProps<User> & HoverUserProps> = (
    {
        item: user,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper,
    }
): ReactElement => {
    const classes = useUsersItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);

    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);

    const follower = myProfile?.followers?.findIndex(follower => follower.id === user?.id);

    const handleClickOpenUnfollowModal = (): void => {
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
        dispatch(followProfile(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
        dispatch(unfollowProfile(user));
        setVisibleUnfollowModal(false);
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
                    <div>
                        <Typography component={"span"} className={classes.fullName}>
                            {user?.fullName}
                        </Typography>
                        {user?.privateProfile && (
                            <span className={classes.lockIcon}>
                                {LockIcon}
                            </span>
                        )}
                    </div>
                    <Typography component={"div"} className={classes.username}>
                        @{user?.username}
                    </Typography>
                    <PopperUserWindow visible={visiblePopperWindow} user={user!}/>
                </Link>
            </div>
            <div style={{flex: 1}}>
                {(myProfile?.id === user?.id) ? null : (
                    (follower === -1) ? (
                        <Button
                            className={classes.outlinedButton}
                            onClick={() => handleFollow(user!)}
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
                            onClick={handleClickOpenUnfollowModal}
                            color="primary"
                            variant="contained"
                        >
                            {btnText}
                        </Button>
                    )
                )}
            </div>
            <UnfollowModal
                user={user!}
                visible={visibleUnfollowModal}
                onClose={onCloseUnfollowModal}
                handleUnfollow={handleUnfollow}
            />
        </ListItem>
    );
};

export default withHoverUser(UsersItem);
