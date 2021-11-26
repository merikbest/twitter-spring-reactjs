import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Paper from '@material-ui/core/Paper';
import {Typography} from "@material-ui/core";

import {fetchUsers} from "../../store/ducks/users/actionCreators";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {selectUsers, selectUsersIsLoading} from "../../store/ducks/users/selectors";
import Follower from "../../components/Follower/Follower";
import {User} from "../../store/ducks/user/contracts/state";
import {useConnectStyles} from "./ConnetsStyles";
import Spinner from "../../components/Spinner/Spinner";

const Connect: FC = (): ReactElement => {
    const classes = useConnectStyles();
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
            <div className={classes.container}>
                {isUsersLoading ? (
                    <Spinner/>
                ) : (
                    <>
                        <Paper className={classes.header} variant="outlined">
                            <Typography variant="h6">
                                Suggested for you
                            </Typography>
                        </Paper>
                        <Paper className={classes.content} variant="outlined">
                            {users && users.map((user) => (
                                <Follower key={user.id} item={user} follow={handleFollow} unfollow={handleUnfollow}/>)
                            )}
                        </Paper>
                    </>
                )}
            </div>
        </>
    );
};

export default Connect;
