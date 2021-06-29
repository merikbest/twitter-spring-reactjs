import produce, {Draft} from 'immer';

import {UserState} from "./contracts/state";
import {UserActions, UserActionsType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialUserState: UserState = {
    data: undefined,
    followers: undefined,
    status: LoadingStatus.NEVER
};

export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {

    switch (action.type) {
        case UserActionsType.SET_USER_DATA:
            draft.data = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.SET_USER_FOLLOWERS:
            draft.followers = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.SET_USER_FOLLOWING:
            draft.followers = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.UPDATE_USER_DATA:
            draft.data = {user: action.payload, token: ""};
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.SIGN_OUT:
            draft.status = LoadingStatus.LOADED;
            draft.data = undefined;
            break;

        case UserActionsType.SET_USER_LOADING_STATE:
            draft.status = action.payload;
            break;

        default:
            break;
    }
}, initialUserState);



