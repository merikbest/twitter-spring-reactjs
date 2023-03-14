import React, { ReactElement } from "react";
import { useSelector } from "react-redux";
import { List } from "@material-ui/core";

import UsersItem, { UserItemSize } from "../../../components/UsersItem/UsersItem";
import Spinner from "../../../components/Spinner/Spinner";
import { selectUsersSearch, selectUsersSearchIsLoading } from "../../../store/ducks/usersSearch/selectors";

const UsersList = (): ReactElement => {
    const isUsersLoading = useSelector(selectUsersSearchIsLoading);
    const users = useSelector(selectUsersSearch);

    return (
        <>
            <List>
                {users?.map((user) => (
                    <UsersItem key={user.id} user={user} size={UserItemSize.MEDIUM} />
                ))}
            </List>
            {isUsersLoading && <Spinner />}
        </>
    );
};

export default UsersList;
