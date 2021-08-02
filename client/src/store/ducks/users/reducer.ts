import produce, {Draft} from 'immer';

import {LoadingStatus} from '../../types';
import {UsersState} from "./contracts/state";
import {UsersActions, UsersActionsType} from "./contracts/actionTypes";

const initialUsersState: UsersState = {
    users: [],
    loadingState: LoadingStatus.NEVER,
};

export const usersReducer = produce((draft: Draft<UsersState>, action: UsersActions) => {
    switch (action.type) {
        case UsersActionsType.SET_USERS:
            draft.users = action.payload;
            draft.loadingState = LoadingStatus.SUCCESS;
            break;

        case UsersActionsType.SET_USER_LOADING_STATE:
            draft.loadingState = action.payload;
            break;

        default:
            break;
    }
}, initialUsersState);
