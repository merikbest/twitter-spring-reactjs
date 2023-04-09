import produce, { Draft } from "immer";

import { UserState } from "./contracts/state";
import { UserActions, UserActionsType } from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";

export const initialUserState: UserState = {
    data: undefined,
    status: LoadingStatus.NEVER
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
            if (draft.data) {
                draft.data.unreadMessagesCount = draft.data.unreadMessagesCount + 1;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_USERNAME:
            if (draft.data) {
                draft.data.username = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_EMAIL:
            if (draft.data) {
                draft.data.email = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_PHONE:
            if (draft.data) {
                draft.data.countryCode = action.payload.countryCode;
                draft.data.phone = action.payload.phone;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_COUNTRY:
            if (draft.data) {
                draft.data.country = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_GENDER:
            if (draft.data) {
                draft.data.gender = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_LANGUAGE:
            if (draft.data) {
                draft.data.language = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_DIRECT:
            if (draft.data) {
                draft.data.isMutedDirectMessages = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_PRIVATE_PROFILE:
            if (draft.data) {
                draft.data.isPrivateProfile = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_COLOR_SCHEME:
            if (draft.data) {
                draft.data.colorScheme = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_BACKGROUND_COLOR:
            if (draft.data) {
                draft.data.backgroundColor = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_NEW_NOTIFICATION:
            if (draft.data) {
                draft.data.notificationsCount = draft.data.notificationsCount + 1;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.RESET_NOTIFICATIONS:
            if (draft.data) {
                draft.data.notificationsCount = 0;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_NEW_MENTION:
            if (draft.data) {
                draft.data.mentionsCount = draft.data.mentionsCount + 1;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.RESET_MENTIONS:
            if (draft.data) {
                draft.data.mentionsCount = 0;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_FOLLOWERS_SIZE:
            if (draft.data) {
                draft.data.followersSize = draft.data.followersSize + 1;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_PROFILE_STARTED:
            if (draft.data) {
                draft.data.profileStarted = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_PIN_TWEET_ID:
            if (draft.data) {
                draft.data.pinnedTweetId = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_READ_MESSAGE:
            if (draft.data) {
                draft.data.unreadMessagesCount = action.payload;
                draft.status = LoadingStatus.LOADED;
            }
            break;

        case UserActionsType.SET_USER_FOLLOWING:
            if (draft.data) {
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
