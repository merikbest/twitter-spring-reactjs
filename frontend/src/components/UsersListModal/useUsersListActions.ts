import { useMemo } from "react";

import {
    fetchLikedUsers,
    fetchRetweetedUsers,
    resetLikedUsersState,
    resetRetweetedUsersState
} from "../../store/ducks/tweet/actionCreators";
import {
    selectIsLikedUsersLoading,
    selectIsRetweetedUsersLoading,
    selectLikedUsers, selectRetweetedUsers
} from "../../store/ducks/tweet/selectors";
import { UsersListModalAction } from "./UsersListModal";

export const useUsersListActions = (usersListModalAction: UsersListModalAction) => {
    const actionMap = {
        [UsersListModalAction.LIKED]: {
            translationKey: "LIKED_BY",
            defaultValue: "Liked by",
            fetchAction: fetchLikedUsers,
            resetAction: resetLikedUsersState,
            isLoadingSelector: selectIsLikedUsersLoading,
            usersSelector: selectLikedUsers
        },
        [UsersListModalAction.RETWEETED]: {
            translationKey: "RETWEETED_BY",
            defaultValue: "Retweeted by",
            fetchAction: fetchRetweetedUsers,
            resetAction: resetRetweetedUsersState,
            isLoadingSelector: selectIsRetweetedUsersLoading,
            usersSelector: selectRetweetedUsers
        }
    };
    return useMemo(() => actionMap[usersListModalAction], [usersListModalAction]);
};
