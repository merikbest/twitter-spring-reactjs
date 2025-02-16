import React, { FC, ReactElement } from "react";
import Paper from "@material-ui/core/Paper";
import { List, Typography } from "@material-ui/core";
import { useTranslation } from "react-i18next";

import Spinner from "../Spinner/Spinner";
import { useConnectToUsersStyles } from "./ConnectToUsersStyles";
import UsersItem, { UserItemSize } from "../UsersItem/UsersItem";
import { useGlobalStyles } from "../../util/globalClasses";
import { UserResponse } from "../../types/user";

interface ConnectToUsersProps {
    translationKey: string,
    defaultValue: string,
    isUsersLoading: boolean,
    users: UserResponse[],
}

const ConnectToUsers: FC<ConnectToUsersProps> = ({ translationKey, defaultValue, isUsersLoading, users }): ReactElement => {
    const globalClasses = useGlobalStyles({});
    const classes = useConnectToUsersStyles();
    const { t } = useTranslation();

    return (
        <div className={globalClasses.contentWrapper}>
            {(isUsersLoading && !users.length) ? (
                <Spinner />
            ) : (
                <>
                    <Paper className={classes.header} variant="outlined">
                        <Typography variant="h5">
                            {t(translationKey, { defaultValue })}
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
