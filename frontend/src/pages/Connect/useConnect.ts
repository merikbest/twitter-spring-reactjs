import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUsers, resetUsersState } from "../../store/ducks/users/actionCreators";
import { selectPagesCount, selectUsers, selectUsersIsLoading } from "../../store/ducks/users/selectors";

export const useConnect = () => {
    const dispatch = useDispatch();
    const users = useSelector(selectUsers);
    const isUsersLoading = useSelector(selectUsersIsLoading);
    const pagesCount = useSelector(selectPagesCount);

    useEffect(() => {
        loadUsers(0);
        window.scrollTo(0, 0);

        return () => {
            dispatch(resetUsersState());
        };
    }, [dispatch]);

    const loadUsers = (page: number): void => {
        dispatch(fetchUsers(page));
    };

    return { users, isUsersLoading, pagesCount, loadUsers };
};
