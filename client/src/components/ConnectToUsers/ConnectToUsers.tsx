import React, {FC, ReactElement} from 'react';
import Paper from "@material-ui/core/Paper";
import {List, Typography} from "@material-ui/core";

import Spinner from "../Spinner/Spinner";
import {User} from "../../store/ducks/user/contracts/state";
import {useConnectToUsersStyles} from "./ConnectToUsersStyles";
import UsersItem, {UserItemSize} from "../UsersItem/UsersItem";

interface ConnectToUsersProps {
    title: string,
    isUsersLoading: boolean,
    users: User[],
}

const ConnectToUsers: FC<ConnectToUsersProps> = ({title, isUsersLoading, users}): ReactElement => {
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
                        <List>
                            {users.map((user) => <UsersItem key={user.id} item={user} size={UserItemSize.MEDIUM}/>)}
                        </List>
                    </Paper>
                </>
            )}
        </div>
    );
};

export default ConnectToUsers;
