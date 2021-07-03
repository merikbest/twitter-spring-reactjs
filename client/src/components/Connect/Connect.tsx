import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {CircularProgress, Typography} from "@material-ui/core";

import {useStylesFollower} from "../FollowingFollowers/FollowerStyles";
import {fetchUsers} from "../../store/ducks/users/actionCreators";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {selectUsersIsLoading, selectUsers} from "../../store/ducks/users/selectors";
import Follower from "../FollowingFollowers/Follower";
import {User} from "../../store/ducks/user/contracts/state";

const Connect = () => {
    const dispatch = useDispatch();
    const classes = useStylesFollower();
    const users = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
    };

    return (
        <>
            {isUsersLoading ? (
                <div className={classes.followersCentred}>
                    <CircularProgress/>
                </div>
            ) : (
                <div>
                    <Paper className={classes.followersConnectHeader} variant="outlined">
                        <Typography variant="h6">Suggested for you</Typography>
                    </Paper>
                    <Paper className={classes.followersWrapper} variant="outlined">
                        {users ? users.map(user =>
                            <Follower user={user} follow={handleFollow} unfollow={handleUnfollow}/>) : null}
                    </Paper>
                </div>
            )}
        </>
    );
};

export default Connect;
