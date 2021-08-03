import produce, {Draft} from 'immer';

import {UserState} from "./contracts/state";
import {UserActions, UserActionsType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

const initialUserState: UserState = {
    data: undefined,
    status: LoadingStatus.NEVER,
};

export const userReducer = produce((draft: Draft<UserState>, action: UserActions) => {

    switch (action.type) {
        case UserActionsType.SET_USER_DATA:
            draft.data = action.payload;
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.SIGN_OUT:
            draft.status = LoadingStatus.LOADED;
            draft.data = undefined;
            break;

        case UserActionsType.FOLLOW:
            if (draft.data?.followers) {
                draft.data.followers = [...draft.data?.followers, action.payload];
            }
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.FOLLOW_USER:
            if (draft.data?.followers) {
                draft.data.followers = [...draft.data?.followers, action.payload];
            }
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.UNFOLLOW:
            if (draft.data?.followers) {
                const unfollowUserIndex = draft.data?.followers?.findIndex(follower => follower.id === action.payload.id);
                draft.data.followers = [
                    ...draft.data?.followers?.slice(0, unfollowUserIndex),
                    ...draft.data?.followers?.slice(unfollowUserIndex + 1)];
            }
            draft.status = LoadingStatus.SUCCESS;
            break;

        case UserActionsType.UNFOLLOW_USER:
            if (draft.data?.followers) {
                const unfollowUserIndex = draft.data?.followers?.findIndex(follower => follower.id === action.payload.id);
                draft.data.followers = [
                    ...draft.data?.followers?.slice(0, unfollowUserIndex),
                    ...draft.data?.followers?.slice(unfollowUserIndex + 1)];
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



