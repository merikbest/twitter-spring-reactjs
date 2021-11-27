import React, {FC, ReactElement, useState} from 'react';
import {useSelector} from "react-redux";
import {Link} from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import {Avatar, Button, Typography} from "@material-ui/core";

import {User} from "../../store/ducks/user/contracts/state";
import {selectUserData} from "../../store/ducks/user/selectors";
import {useFollowerStyles} from "./FollowerStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import PopperUserWindow from "../PopperUserWindow/PopperUserWindow";
import {HoverUserProps, withHoverUser} from "../../hoc/withHoverUser";
import UnfollowModal from "../UnfollowModal/UnfollowModal";
import {LockIcon} from "../../icons";

interface FollowerProps<T> {
    item?: T;
    follow?: (user: User) => void;
    unfollow?: (user: User) => void;
}

const Follower: FC<FollowerProps<User> & HoverUserProps> = (
    {
        item: user,
        follow,
        unfollow,
        visiblePopperWindow,
        handleHoverPopper,
        handleLeavePopper
    }
): ReactElement => {
    const classes = useFollowerStyles();
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
        if (follow) follow(user);
    };

    const handleUnfollow = (user: User): void => {
        if (unfollow) unfollow(user);
        setVisibleUnfollowModal(false);
    };

    return (
        <Paper className={classes.container} variant="outlined">
            <Link to={`/user/${user?.id}`} className={classes.link}>
                <Avatar
                    className={classes.listAvatar}
                    src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}
                />
            </Link>
            <div style={{flex: 1}}>
                <div className={classes.header}>
                    <div onMouseEnter={handleHoverPopper} onMouseLeave={handleLeavePopper}>
                        <Link to={`/user/${user?.id}`} className={classes.link}>
                            <div className={classes.followerInfo}>
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
                            </div>
                        </Link>
                        <PopperUserWindow visible={visiblePopperWindow} user={user!}/>
                    </div>
                    <div>
                        {(myProfile?.id !== user?.id) && (
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
                                    className={classes.containedButton}
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
                </div>
                <Typography display="block">
                    {user?.about}
                </Typography>
                <UnfollowModal
                    user={user!}
                    visible={visibleUnfollowModal}
                    onClose={onCloseUnfollowModal}
                    handleUnfollow={handleUnfollow}
                />
            </div>
        </Paper>
    );
};

export default withHoverUser(Follower);
