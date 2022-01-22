import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUsers} from "../../store/ducks/users/actionCreators";
import {selectUsers, selectUsersIsLoading} from "../../store/ducks/users/selectors";
import ConnectToUsers from "../../components/ConnectToUsers/ConnectToUsers";

const Connect: FC = (): ReactElement => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);

    useEffect(() => {
        dispatch(fetchUsers());
        window.scrollTo(0, 0);
    }, []);

    return (
        <ConnectToUsers
            title={"Suggested for you"}
            isUsersLoading={isUsersLoading}
            users={users}
        />
    );
};

export default Connect;
