import React, { FC, ReactElement } from "react";
import Paper from "@material-ui/core/Paper";
import { List, Typography } from "@material-ui/core";

import Spinner from "../Spinner/Spinner";
import { useConnectToUsersStyles } from "./ConnectToUsersStyles";
import UsersItem, { UserItemSize } from "../UsersItem/UsersItem";
import { useGlobalStyles } from "../../util/globalClasses";
import { UserResponse } from "../../types/user";

interface ConnectToUsersProps {
    title: string,
    isUsersLoading: boolean,
    users: UserResponse[],
}

const ConnectToUsers: FC<ConnectToUsersProps> = ({ title, isUsersLoading, users }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useConnectToUsersStyles();

    return (
        <div className={globalClasses.contentWrapper}>
            {(isUsersLoading && !users.length) ? (
                <Spinner />
            ) : (
                <>
                    <Paper className={classes.header} variant="outlined">
                        <Typography variant="h5">
                            {title}
                        </Typography>
                    </Paper>
                    <Paper className={globalClasses.pageContainer} variant="outlined">
                        <List>
                            {users.map((user) => <UsersItem key={user.id} user={user} size={UserItemSize.MEDIUM} />)}
                        </List>
                        {isUsersLoading && <Spinner />}
                    </Paper>
                </>
            )}
        </div>
    );
};

export default ConnectToUsers;
