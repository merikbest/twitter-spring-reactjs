import produce, {Draft} from 'immer';

import {LoadingStatus} from '../../types';
import {BlockedAndMutedUsersActions, BlockedAndMutedUsersActionsType} from './contracts/actionTypes';
import {BlockedAndMutedUsersState} from './contracts/state';

export const initialBlockedAndMutedUsersState: BlockedAndMutedUsersState = {
    blockedUsers: [],
    mutedUsers: [],
    loadingState: LoadingStatus.LOADING,
};

export const blockedAndMutedUsersReducer = produce((draft: Draft<BlockedAndMutedUsersState>, action: BlockedAndMutedUsersActions) => {
    switch (action.type) {
        case BlockedAndMutedUsersActionsType.SET_BLOCKED_USERS:
            draft.blockedUsers = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case BlockedAndMutedUsersActionsType.SET_MUTED_USERS:
            draft.mutedUsers = action.payload;
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
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case BlockedAndMutedUsersActionsType.SET_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialBlockedAndMutedUsersState);
