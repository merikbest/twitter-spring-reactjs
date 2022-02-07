import produce, {Draft} from 'immer';

import {User, UserState} from "./contracts/state";
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
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SIGN_OUT:
            draft.status = LoadingStatus.LOADED;
            draft.data = undefined;
            break;

        case UserActionsType.FOLLOW:
            if (draft.data?.followers) {
                draft.data.followers = [...draft.data?.followers, action.payload];
            }
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.FOLLOW_USER:
            if (draft.data?.followers) {
                draft.data.followers = [...draft.data?.followers, action.payload];
            }
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.UNFOLLOW:
            if (draft.data?.followers) {
                const unfollowUserIndex = draft.data?.followers?.findIndex(follower => follower.id === action.payload.id);
                draft.data.followers = [
                    ...draft.data?.followers?.slice(0, unfollowUserIndex),
                    ...draft.data?.followers?.slice(unfollowUserIndex + 1)];
            }
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.UNFOLLOW_USER:
            if (draft.data?.followers) {
                const unfollowUserIndex = draft.data?.followers?.findIndex(follower => follower.id === action.payload.id);
                draft.data.followers = [
                    ...draft.data?.followers?.slice(0, unfollowUserIndex),
                    ...draft.data?.followers?.slice(unfollowUserIndex + 1)];
            }
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_UNREAD_MESSAGE:
            if (draft.data?.unreadMessages) {
                draft.data!.unreadMessages = [...draft.data.unreadMessages, action.payload];
            }
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_USERNAME:
            draft.data!.username = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_PHONE:
            draft.data!.countryCode = action.payload.countryCode;
            draft.data!.phone = action.payload.phone;
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_COUNTRY:
            draft.data!.country = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_GENDER:
            draft.data!.gender = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_LANGUAGE:
            draft.data!.language = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_DIRECT:
            draft.data!.mutedDirectMessages = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_PRIVATE_PROFILE:
            draft.data!.privateProfile = action.payload;
            draft.status = LoadingStatus.LOADED;
            break;
            // SET_EMAIL
            // SET_COLOR_SCHEME
            // SET_BACKGROUND_COLOR
        case UserActionsType.SET_NEW_NOTIFICATION:
            draft.data = {...draft.data as User, notificationsCount: draft.data?.notificationsCount! + 1};
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_USER_LOADING_STATE:
            draft.status = action.payload;
            break;

        default:
            break;
    }
}, initialUserState);
