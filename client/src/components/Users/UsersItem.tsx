import React, {FC, ReactElement, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import ListItemAvatar from "@material-ui/core/ListItemAvatar/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar/Avatar";
import ListItemText from "@material-ui/core/ListItemText/ListItemText";
import {Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button/Button";
import ListItem from "@material-ui/core/ListItem/ListItem";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";

import {User} from "../../store/ducks/user/contracts/state";
import {selectUserData} from "../../store/ducks/user/selectors";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {useUsersItemStyles} from "./UsersItemStyles";
import {DEFAULT_PROFILE_IMG} from "../../util/url";
import {followProfile, unfollowProfile} from "../../store/ducks/userProfile/actionCreators";

interface UsersItemProps {
    user: User
}

const UsersItem: FC<UsersItemProps> = ({user}): ReactElement => {
    const classes = useUsersItemStyles();
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);
    const follower = myProfile?.followers?.findIndex(follower => follower.id === user.id);

    const handleClickOpenUnfollowModal = (): void => {
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
        // dispatch(followProfile(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
        // dispatch(unfollowProfile(user));
        setVisibleUnfollowModal(false);
    };

    return (
        <ListItem key={user.id} className={classes.container}>
            <ListItemAvatar>
                <Avatar alt={`${user.id}`} src={user?.avatar?.src ? user?.avatar.src : DEFAULT_PROFILE_IMG}/>
            </ListItemAvatar>
            <Link to={`/user/${user.id}`}>
                <ListItemText
                    primary={user.fullName}
                    secondary={
                        <Typography component="span" variant="body2" color="textSecondary">
                            @{user.username}
                        </Typography>
                    }
                />
            </Link>
            <div style={{flex: 1}}>
                {myProfile?.id === user.id ? null : (
                    follower === -1 ? (
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
                            onClick={handleClickOpenUnfollowModal}
                            color="primary"
                            variant="contained"
                        >
                            {btnText}
                        </Button>
                    )
                )}
            </div>
            <Dialog open={visibleUnfollowModal} onClose={onCloseUnfollowModal} aria-labelledby="form-dialog-title">
                <DialogContent style={{padding: "0px 0px"}}>
                    <div className={classes.modalWrapper}>
                        <Typography className={classes.modalFullName}>
                            Unfollow {user?.fullName}?
                        </Typography>
                        <div className={classes.modalUsername}>
                            Their Tweets will no longer show up in your home timeline. You can still view their
                            profile, unless their Tweets are protected.
                        </div>
                        <div className={classes.modalButtonContainer}>
                            <Button
                                className={classes.modalCancelButton}
                                onClick={onCloseUnfollowModal}
                                variant="contained"
                            >
                                Cancel
                            </Button>
                            <Button
                                className={classes.modalUnfollowButton}
                                onClick={() => handleUnfollow(user)}
                                variant="contained"
                                color="primary"
                            >
                                Unfollow
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </ListItem>
    );
};

export default UsersItem;
