import React, {FC, ReactElement, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {fetchUsers} from "../../store/ducks/users/actionCreators";
import {followUser, unfollowUser} from "../../store/ducks/user/actionCreators";
import {selectUsers, selectUsersIsLoading} from "../../store/ducks/users/selectors";
import {User} from "../../store/ducks/user/contracts/state";
import ConnectToUsers from "../../components/ConnectToUsers/ConnectToUsers";

const Connect: FC = (): ReactElement => {
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
        <ConnectToUsers
            title={"Suggested for you"}
            isUsersLoading={isUsersLoading}
            users={users}
            handleFollow={handleFollow}
            handleUnfollow={handleUnfollow}
        />
    );
};

export default Connect;
