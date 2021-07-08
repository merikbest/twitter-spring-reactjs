import React, {FC, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {CircularProgress, Typography} from "@material-ui/core";

import {fetchUsers} from "../../store/ducks/users/actionCreators";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {selectUsersIsLoading, selectUsers} from "../../store/ducks/users/selectors";
import Follower from "../FollowingFollowers/Follower";
import {User} from "../../store/ducks/user/contracts/state";
import {useHomeStyles} from "../../pages/Home/HomeStyles";

interface ConnectProps {
    classes: ReturnType<typeof useHomeStyles>;
}

const Connect: FC<ConnectProps> = ({classes}) => {
    const dispatch = useDispatch();
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
                            <Follower classes={classes} user={user} follow={handleFollow} unfollow={handleUnfollow}/>)
                            : null
                        }
                    </Paper>
                </div>
            )}
        </>
    );
};

export default Connect;
