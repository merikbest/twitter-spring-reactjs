import produce, { Draft } from "immer";

import { UsersState } from "./contracts/state";
import { UsersActions, UsersActionsType } from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

export const initialUsersState: UsersState = {
    users: [],
    pagesCount: 1,
    loadingState: LoadingStatus.LOADING
};

export const usersReducer = produce((draft: Draft<UsersState>, action: UsersActions) => {
    switch (action.type) {
        case UsersActionsType.SET_USERS:
            draft.users = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.SET_PAGEABLE_USERS:
            draft.users = [...draft.users, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.SET_FOLLOW_TO_USERS_STATE:
            const followUserIndex = draft.users.findIndex((user) => user.id === action.payload.userId);
            if (followUserIndex !== -1) draft.users[followUserIndex].isFollower = action.payload.isFollower;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.SET_FOLLOW_REQUEST_TO_USERS_STATE:
            const followUserRequestIndex = draft.users.findIndex((user) => user.id === action.payload.userId);
            if (followUserRequestIndex !== -1) draft.users[followUserRequestIndex].isWaitingForApprove = action.payload.isWaitingForApprove;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.SET_BLOCKED_USERS_STATE:
            const blockedUserIndex = draft.users.findIndex((user) => user.id === action.payload.userId);
            if (blockedUserIndex !== -1) draft.users[blockedUserIndex].isUserBlocked = action.payload.isUserBlocked;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.SET_MUTED_USERS_STATE: // TODO NOT NEEDED ???
            const mutedUserIndex = draft.users.findIndex((user) => user.id === action.payload.userId);
            // if (mutedUserIndex !== -1) draft.users[mutedUserIndex].isUserMuted = action.payload.isUserMuted;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.RESET_USERS_STATE:
            draft.users = [];
            draft.pagesCount = 1;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case UsersActionsType.SET_USER_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUsersState);
