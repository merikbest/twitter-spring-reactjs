import produce, {Draft} from 'immer';

import {UserState} from "./contracts/state";
import {UserActions, UserActionsType} from './contracts/actionTypes';
import {LoadingStatus} from '../../types';

export const initialUserState: UserState = {
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
            draft.data = undefined;
            draft.status = LoadingStatus.LOADED;
            break;

        case UserActionsType.SET_UNREAD_MESSAGE:
            if (draft.data !== undefined) {
                draft.data.unreadMessagesSize = draft.data.unreadMessagesSize + 1;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_USERNAME:
            if (draft.data !== undefined) {
                draft.data.username = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_EMAIL:
            if (draft.data !== undefined) {
                draft.data.email = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_PHONE:
            if (draft.data !== undefined) {
                draft.data.countryCode = action.payload.countryCode;
                draft.data.phone = action.payload.phone;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_COUNTRY:
            if (draft.data !== undefined) {
                draft.data.country = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_GENDER:
            if (draft.data !== undefined) {
                draft.data.gender = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_LANGUAGE:
            if (draft.data !== undefined) {
                draft.data.language = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_DIRECT:
            if (draft.data !== undefined) {
                draft.data.mutedDirectMessages = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_PRIVATE_PROFILE:
            if (draft.data !== undefined) {
                draft.data.isPrivateProfile = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_COLOR_SCHEME:
            if (draft.data !== undefined) {
                draft.data.colorScheme = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_BACKGROUND_COLOR:
            if (draft.data !== undefined) {
                draft.data.backgroundColor = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_NEW_NOTIFICATION:
            if (draft.data !== undefined) {
                draft.data.notificationsCount = draft.data.notificationsCount + 1;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_FOLLOWERS_SIZE:
            if (draft.data !== undefined) {
                draft.data.followersSize = draft.data.followersSize + 1;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_PROFILE_STARTED:
            if (draft.data !== undefined) {
                draft.data.profileStarted = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_PIN_TWEET_ID:
            if (draft.data !== undefined) {
                draft.data.pinnedTweetId = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_READ_MESSAGE:
            if (draft.data !== undefined) {
                draft.data.unreadMessagesSize = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_USER_FOLLOWING:
            if (draft.data !== undefined) {
                draft.data.followersSize = action.payload ? draft.data.followersSize + 1 : draft.data.followersSize - 1;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_USER_LOADING_STATE:
            draft.status = action.payload;
            break;

        default:
            break;
    }
}, initialUserState);
