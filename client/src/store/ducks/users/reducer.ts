import produce, {Draft} from 'immer';

import {LoadingStatus} from '../../types';
import {UsersState} from "./contracts/state";
import {UsersActions, UsersActionsType} from "./contracts/actionTypes";

const initialUsersState: UsersState = {
    users: [],
    loadingState: LoadingStatus.LOADING,
};

export const usersReducer = produce((draft: Draft<UsersState>, action: UsersActions) => {
    switch (action.type) {
        case UsersActionsType.SET_USERS:
            draft.users = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.SET_UPDATED_USER:
            const updatedUserIndex = draft.users.findIndex((user) => user.id === action.payload.id);
            if (updatedUserIndex !== -1) draft.users[updatedUserIndex] = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.RESET_USERS_STATE:
            draft.users = [];
            draft.loadingState = LoadingStatus.LOADING;
            break;

        case UsersActionsType.SET_USER_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUsersState);
