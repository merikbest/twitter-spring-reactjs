import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {CircularProgress, Typography} from "@material-ui/core";

import {useStylesFollower} from "../FollowingFollowers/FollowerStyles";
import {fetchUsers} from "../../store/ducks/users/actionCreators";
import {selectUsersIsLoading, selectUsersItems} from "../../store/ducks/users/selectors";
import Follower from "../FollowingFollowers/Follower";
import {selectUserData} from "../../store/ducks/user/selectors";

const Connect = () => {
    const dispatch = useDispatch();
    const classes = useStylesFollower();
    const users = useSelector(selectUsersItems);
    const isUsersLoading = useSelector(selectUsersIsLoading);

    useEffect(() => {
        dispatch(fetchUsers());
    }, []);

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
                        {users ? users.map(user => <Follower user={user}/>) : null}
                    </Paper>
                </div>
            )}
        </>
    );
};

export default Connect;
