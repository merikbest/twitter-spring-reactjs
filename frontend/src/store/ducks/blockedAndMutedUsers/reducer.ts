import produce, { Draft } from "immer";

import { BlockedAndMutedUsersActions, BlockedAndMutedUsersActionsType } from "./contracts/actionTypes";
import { BlockedAndMutedUsersState } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const initialBlockedAndMutedUsersState: BlockedAndMutedUsersState = {
    blockedUsers: [],
    mutedUsers: [],
    pagesCount: 0,
    loadingState: LoadingStatus.LOADING
};

export const blockedAndMutedUsersReducer = produce((draft: Draft<BlockedAndMutedUsersState>, action: BlockedAndMutedUsersActions) => {
    switch (action.type) {
        case BlockedAndMutedUsersActionsType.SET_BLOCKED_USERS:
            draft.blockedUsers = [...draft.blockedUsers, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case BlockedAndMutedUsersActionsType.SET_MUTED_USERS:
            draft.mutedUsers = [...draft.mutedUsers, ...action.payload.items];
            draft.pagesCount = action.payload.pagesCount;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case BlockedAndMutedUsersActionsType.SET_BLOCKED_USER:
            const blockedUserIndex = draft.blockedUsers.findIndex((user) => user.id === action.payload.userId);
            if (blockedUserIndex !== -1) draft.blockedUsers[blockedUserIndex].isUserBlocked = action.payload.isUserBlocked;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case BlockedAndMutedUsersActionsType.SET_MUTED_USER:
            const mutedUserIndex = draft.mutedUsers.findIndex((user) => user.id === action.payload.userId);
            if (mutedUserIndex !== -1) draft.mutedUsers[mutedUserIndex].isUserMuted = action.payload.isUserMuted;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case BlockedAndMutedUsersActionsType.RESET_TAGS_STATE:
            draft.blockedUsers = [];
            draft.mutedUsers = [];
            draft.pagesCount = 0;
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case BlockedAndMutedUsersActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialBlockedAndMutedUsersState);
