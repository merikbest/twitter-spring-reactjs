import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchBlockedUsers,
    resetBlockedAndMutedUsersState
} from "../../../../../store/ducks/blockedAndMutedUsers/actionCreators";
import {
    selectBlockedUsersItems,
    selectIsBlockedAndMutedUsersLoaded,
    selectIsBlockedAndMutedUsersLoading,
    selectUsersPagesCount
} from "../../../../../store/ducks/blockedAndMutedUsers/selectors";

export const useBlockedAccounts = () => {
    const dispatch = useDispatch();
    const blockedUsers = useSelector(selectBlockedUsersItems);
    const isBlockedUsersLoading = useSelector(selectIsBlockedAndMutedUsersLoading);
    const isBlockedUsersLoaded = useSelector(selectIsBlockedAndMutedUsersLoaded);
    const blockedUsersPagesCount = useSelector(selectUsersPagesCount);
    const [activeTab, setActiveTab] = useState<number>(0);

    useEffect(() => {
        loadBlockedUsers(0);

        return () => {
            dispatch(resetBlockedAndMutedUsersState());
        };
    }, [dispatch]);

    const handleChangeTab = (event: ChangeEvent<{}>, newValue: number): void => {
        setActiveTab(newValue);
    };

    const loadBlockedUsers = (page: number): void => {
        dispatch(fetchBlockedUsers(page));
    };

    return {
        blockedUsers,
        isBlockedUsersLoading,
        isBlockedUsersLoaded,
        blockedUsersPagesCount,
        activeTab,
        handleChangeTab,
        loadBlockedUsers
    };
};
