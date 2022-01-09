import React, {FC, ReactElement} from 'react';
import Paper from "@material-ui/core/Paper";
import {Typography} from "@material-ui/core";

import Spinner from "../Spinner/Spinner";
import Follower from "../Follower/Follower";
import {User} from "../../store/ducks/user/contracts/state";
import {useConnectToUsersStyles} from "./ConnectToUsersStyles";

interface ConnectToUsersProps {
    title: string,
    isUsersLoading: boolean,
    users: User[],
    handleFollow: (user: User) => void;
    handleUnfollow: (user: User) => void;
}

const ConnectToUsers: FC<ConnectToUsersProps> = (
    {
        title,
        isUsersLoading,
        users,
        handleFollow,
        handleUnfollow
    }
): ReactElement => {
    const classes = useConnectToUsersStyles();

    return (
        <div className={classes.container}>
            {isUsersLoading ? (
                <Spinner/>
            ) : (
                <>
                    <Paper className={classes.header} variant="outlined">
                        <Typography variant="h5">
                            {title}
                        </Typography>
                    </Paper>
                    <Paper className={classes.content} variant="outlined">
                        {users.map((user) => (
                            <Follower key={user.id} item={user} follow={handleFollow} unfollow={handleUnfollow}/>)
                        )}
                    </Paper>
                </>
            )}
        </div>
    );
};

export default ConnectToUsers;
