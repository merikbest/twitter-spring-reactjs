import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchMutedUsers,
    resetBlockedAndMutedUsersState
} from "../../../../../store/ducks/blockedAndMutedUsers/actionCreators";
import {
    selectIsBlockedAndMutedUsersLoaded,
    selectIsBlockedAndMutedUsersLoading,
    selectMutedUsersItems,
    selectUsersPagesCount
} from "../../../../../store/ducks/blockedAndMutedUsers/selectors";

export const useMutedAccounts = () => {
    const dispatch = useDispatch();
    const mutedUsers = useSelector(selectMutedUsersItems);
    const isMutedUsersLoading = useSelector(selectIsBlockedAndMutedUsersLoading);
    const isMutedUsersLoaded = useSelector(selectIsBlockedAndMutedUsersLoaded);
    const mutedUsersPagesCount = useSelector(selectUsersPagesCount);

    useEffect(() => {
        loadMutedUsers(0);

        return () => {
            dispatch(resetBlockedAndMutedUsersState());
        };
    }, [dispatch]);

    const loadMutedUsers = (page: number): void => {
        dispatch(fetchMutedUsers(page));
    };

    return { mutedUsers, isMutedUsersLoading, isMutedUsersLoaded, mutedUsersPagesCount, loadMutedUsers };
};
