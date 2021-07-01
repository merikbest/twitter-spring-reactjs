import produce, {Draft} from 'immer';

import {LoadingStatus} from '../../types';
import {UsersState} from "./contracts/state";
import {UsersActions, UsersActionsType} from "./contracts/actionTypes";

const initialUsersState: UsersState = {
    user: undefined,
    users: [],
    loadingState: LoadingStatus.NEVER,
};

export const usersReducer = produce((draft: Draft<UsersState>, action: UsersActions) => {
    switch (action.type) {
        case UsersActionsType.SET_USER:
            draft.user = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.SET_USERS:
            draft.users = action.payload;
            draft.loadingState = LoadingStatus.LOADED;
            break;

        case UsersActionsType.UNFOLLOW_USER:
            if (draft.user?.followers) {
                const unfollowUserIndex = draft.user?.followers?.findIndex(follower => follower.id === action.payload);
                draft.user.followers = [
                    ...draft?.user?.followers?.slice(0, unfollowUserIndex),
                    ...draft?.user?.followers?.slice(unfollowUserIndex + 1)];
            }
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.SET_USER_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUsersState);
