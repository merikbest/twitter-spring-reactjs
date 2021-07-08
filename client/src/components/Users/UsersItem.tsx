import React, {FC, useState} from 'react';
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

import {useHomeStyles} from "../../pages/Home/HomeStyles";
import {User} from "../../store/ducks/user/contracts/state";
import {selectUserData} from "../../store/ducks/user/selectors";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";

interface UsersItem {
    user: User
    classes: ReturnType<typeof useHomeStyles>;
}

const UsersItem: FC<UsersItem> = ({user, classes}) => {
    const dispatch = useDispatch();
    const myProfile = useSelector(selectUserData);
    const [btnText, setBtnText] = useState<string>("Following");
    const [visibleUnfollowModal, setVisibleUnfollowModal] = useState<boolean>(false);
    const follower = myProfile?.user?.followers?.findIndex(follower => follower.id === user.id);

    const handleClickOpenUnfollowModal = (): void => {
        setVisibleUnfollowModal(true);
    };

    const onCloseUnfollowModal = (): void => {
        setVisibleUnfollowModal(false);
    };

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
        setVisibleUnfollowModal(false);
    };

    return (
        <ListItem key={user.id} className={classes.rightSideBlockItem}>
            <ListItemAvatar>
                <Avatar alt={`${user.id}`} src={user.avatar?.src}/>
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
            {myProfile?.user.id === user.id ? null : (
                follower ? (
                    <Button
                        className={classes.rightSideFollowOutlinedBtn}
                        onClick={() => handleFollow(user)}
                        color="primary"
                        variant="outlined">
                        Follow
                    </Button>
                ) : (
                    <Button
                        className={classes.rightSideFollowOutlinedBtn}
                        onMouseOver={() => setBtnText("Unfollow")}
                        onMouseLeave={() => setBtnText("Following")}
                        onClick={handleClickOpenUnfollowModal}
                        variant="contained"
                        color="primary">
                        {btnText}
                    </Button>
                )
            )}
            <Dialog open={visibleUnfollowModal} onClose={onCloseUnfollowModal} aria-labelledby="form-dialog-title">
                <DialogContent style={{padding: "0px 0px"}}>
                    <div className={classes.followerModalContentWrapper}>
                        <Typography className={classes.followerModalFullName}>
                            Unfollow {user?.fullName}?
                        </Typography>
                        <div className={classes.followerModalUsername}>
                            Their Tweets will no longer show up in your home timeline. You can still view their
                            profile, unless their Tweets are protected.
                        </div>
                        <div className={classes.followerModalBtnContainer}>
                            <Button
                                className={classes.followerModalCancelBtn}
                                onClick={onCloseUnfollowModal}
                                variant="contained">
                                Cancel
                            </Button>
                            <Button
                                className={classes.followerModalUnfollowBtn}
                                onClick={() => handleUnfollow(user)}
                                variant="contained"
                                color="primary">
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
