import produce, {Draft} from 'immer';

import {UserState} from "./contracts/state";
import {UserActions, UserActionsType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialUserState: UserState = {
    data: undefined,
    status: LoadingStatus.NEVER,
    errorStatus: 0
};

export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {

    switch (action.type) {
        case UserActionsType.SET_USER_DATA:
            draft.data = action.payload;
            draft.errorStatus = 0;
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

        case UserActionsType.SIGN_IN_ERROR:
            draft.errorStatus = action.payload;
            break;

        case UserActionsType.FOLLOW_USER:
            if (draft.data?.user?.followers) {
                draft.data.user.followers = [...draft.data?.user.followers, action.payload];
            }
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.UNFOLLOW_USER:
            if (draft.data?.user?.followers) {
                const unfollowUserIndex = draft.data?.user?.followers?.findIndex(follower => follower.id === action.payload.id);
                draft.data.user.followers = [
                    ...draft.data?.user?.followers?.slice(0, unfollowUserIndex),
                    ...draft.data?.user?.followers?.slice(unfollowUserIndex + 1)];
            }
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.SET_USER_LOADING_STATE:
            draft.status = action.payload;
            break;

        default:
            break;
    }
}, initialUserState);



