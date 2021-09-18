import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {CircularProgress, Typography} from "@material-ui/core";

import {fetchUsers} from "../../store/ducks/users/actionCreators";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {selectUsersIsLoading, selectUsers} from "../../store/ducks/users/selectors";
import Follower from "../../components/Follower/Follower";
import {User} from "../../store/ducks/user/contracts/state";
import {useConnectStyles} from "./ConnetsStyles";

const Connect: FC = (): ReactElement => {
    const classes2 = useConnectStyles();
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);

    useEffect(() => {
        dispatch(fetchUsers());
        window.scrollTo(0, 0);
    }, []);

    const handleFollow = (user: User): void => {
        dispatch(followUser(user));
    };

    const handleUnfollow = (user: User): void => {
        dispatch(unfollowUser(user));
    };

    return (
        <>
            <div style={{paddingTop: 48,}}>
                {isUsersLoading ? (
                    <div className={classes2.loading}>
                        <CircularProgress/>
                    </div>
                ) : (
                    <>
                        <Paper className={classes2.header} variant="outlined">
                            <Typography variant="h6">Suggested for you</Typography>
                        </Paper>
                        <Paper className={classes2.content} variant="outlined">
                            {users && users.map(user =>
                                <Follower item={user} follow={handleFollow} unfollow={handleUnfollow}/>)
                            }
                        </Paper>
                    </>
                )}
            </div>
        </>
    );
};

export default Connect;
