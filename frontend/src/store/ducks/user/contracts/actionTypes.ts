import { Action } from "redux";

import { ChangePhoneResponse, SettingsRequest, UserActionRequest, UserRequest, UserState } from "./state";
import { EndRegistrationRequest } from "../../../../pages/Authentication/SetPasswordModal/SetPasswordModal";
import { ChatMessageResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";
import { LoginRequest } from "../../../../types/auth";

export enum UserActionsType {
    // followersSize
    SIGN_OUT = "user/SIGN_OUT",
    FETCH_SIGN_IN = "user/FETCH_SIGN_IN",
    FETCH_SIGN_UP = "user/FETCH_SIGN_UP",
    SET_USER_DATA = "user/SET_USER_DATA",
    FETCH_USER_DATA = "user/FETCH_USER_DATA",
    SET_USER_LOADING_STATE = "user/SET_USER_LOADING_STATE",
    UPDATE_USER_DATA = "user/UPDATE_USER_DATA",
    SET_FOLLOWERS_SIZE = "user/SET_FOLLOWERS_SIZE",
    SET_PROFILE_STARTED = "user/SET_PROFILE_STARTED",
    SET_PIN_TWEET_ID = "user/SET_PIN_TWEET_ID",
    SET_READ_MESSAGE = "user/SET_READ_MESSAGE",
    FOLLOW_USER = "user/FOLLOW_USER",
    UNFOLLOW_USER = "user/UNFOLLOW_USER",
    SET_USER_FOLLOWING = "user/SET_USER_FOLLOWING",
    FETCH_PIN_TWEET = "user/FETCH_PIN_TWEET",
    PROCESS_FOLLOW_REQUEST = "user/PROCESS_FOLLOW_REQUEST",
    PROCESS_USER_TO_BLOCKLIST = "user/PROCESS_USER_TO_BLOCKLIST",
    PROCESS_USER_TO_MUTELIST = "user/PROCESS_USER_TO_MUTELIST",
    UPDATE_USERNAME = "user/UPDATE_USERNAME",
    UPDATE_EMAIL = "user/UPDATE_EMAIL",
    UPDATE_PHONE = "user/UPDATE_PHONE",
    UPDATE_COUNTRY = "user/UPDATE_COUNTRY",
    UPDATE_GENDER = "user/UPDATE_GENDER",
    UPDATE_LANGUAGE = "user/UPDATE_LANGUAGE",
    UPDATE_DIRECT = "user/UPDATE_DIRECT",
    UPDATE_PRIVATE_PROFILE = "user/UPDATE_PRIVATE_PROFILE",
    UPDATE_COLOR_SCHEME = "user/UPDATE_COLOR_SCHEME",
    UPDATE_BACKGROUND_COLOR = "user/UPDATE_BACKGROUND_COLOR",
    SET_USERNAME = "user/SET_USERNAME",
    SET_EMAIL = "user/SET_EMAIL",
    SET_PHONE = "user/SET_PHONE",
    SET_COUNTRY = "user/SET_COUNTRY",
    SET_GENDER = "user/SET_GENDER",
    SET_LANGUAGE = "user/SET_LANGUAGE",
    SET_DIRECT = "user/SET_DIRECT",
    SET_PRIVATE_PROFILE = "user/SET_PRIVATE_PROFILE",
    SET_COLOR_SCHEME = "user/SET_COLOR_SCHEME",
    SET_BACKGROUND_COLOR = "user/SET_BACKGROUND_COLOR",
    START_USE_TWITTER = "user/START_USE_TWITTER",
    FETCH_READ_MESSAGES = "user/FETCH_READ_MESSAGES",
    SET_UNREAD_MESSAGE = "user/SET_UNREAD_MESSAGE",
    SET_NEW_NOTIFICATION = "user/SET_NEW_NOTIFICATION",
    RESET_NOTIFICATIONS = "user/RESET_NOTIFICATIONS",
    SET_NEW_MENTION = "user/SET_NEW_MENTION",
    RESET_MENTIONS = "user/RESET_MENTIONS",
}

export interface SignOutActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SIGN_OUT;
}

export interface FetchSignInActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_IN;
    payload: LoginRequest;
}

export interface FetchSignUpActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_UP;
    payload: EndRegistrationRequest;
}

export interface SetUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_DATA;
    payload: UserState["data"] | undefined;
}

export interface FetchUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_USER_DATA;
}

export interface SetUserLoadingStateActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}

export interface UpdateUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_USER_DATA;
    payload: UserRequest;
}

export interface SetFollowersSizeActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_FOLLOWERS_SIZE;
}

export interface SetProfileStartedActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_PROFILE_STARTED;
    payload: boolean;
}

export interface SetPinTweetIdActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_PIN_TWEET_ID;
    payload: number;
}

export interface SetReadMessageActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_READ_MESSAGE;
    payload: number;
}

export interface FollowUserActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FOLLOW_USER;
    payload: UserActionRequest;
}

export interface UnfollowUserActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UNFOLLOW_USER;
    payload: UserActionRequest;
}

export interface SetUserFollowingActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_FOLLOWING;
    payload: boolean;
}

export interface FetchPinTweetActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_PIN_TWEET;
    payload: number;
}

export interface ProcessFollowRequestActionInterface extends Action<UserActionsType> {
    type: UserActionsType.PROCESS_FOLLOW_REQUEST;
    payload: number;
}

export interface ProcessUserToBlocklistActionInterface extends Action<UserActionsType> {
    type: UserActionsType.PROCESS_USER_TO_BLOCKLIST;
    payload: UserActionRequest;
}

export interface ProcessUserToMuteListActionInterface extends Action<UserActionsType> {
    type: UserActionsType.PROCESS_USER_TO_MUTELIST;
    payload: UserActionRequest;
}

export interface UpdateUsernameActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_USERNAME;
    payload: SettingsRequest;
}

export interface UpdateEmailActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_EMAIL;
    payload: SettingsRequest;
}

export interface UpdatePhoneActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_PHONE;
    payload: SettingsRequest;
}

export interface UpdateCountryActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_COUNTRY;
    payload: SettingsRequest;
}

export interface UpdateGenderActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_GENDER;
    payload: SettingsRequest;
}

export interface UpdateLanguageActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_LANGUAGE;
    payload: SettingsRequest;
}

export interface UpdateDirectActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_DIRECT;
    payload: SettingsRequest;
}

export interface UpdatePrivateProfileActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_PRIVATE_PROFILE;
    payload: SettingsRequest;
}

export interface UpdateColorSchemeActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_COLOR_SCHEME;
    payload: SettingsRequest;
}

export interface UpdateBackgroundColorActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_BACKGROUND_COLOR;
    payload: SettingsRequest;
}

export interface StartUseTwitterActionInterface extends Action<UserActionsType> {
    type: UserActionsType.START_USE_TWITTER;
}

export interface FetchReadMessagesActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_READ_MESSAGES;
    payload: number;
}

export interface SetUnreadMessageActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_UNREAD_MESSAGE;
    payload: ChatMessageResponse;
}

export interface SetNewNotificationActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_NEW_NOTIFICATION;
}

export interface ResetNotificationsActionInterface extends Action<UserActionsType> {
    type: UserActionsType.RESET_NOTIFICATIONS;
}

export interface SetNewMentionActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_NEW_MENTION;
}

export interface ResetMentionsActionInterface extends Action<UserActionsType> {
    type: UserActionsType.RESET_MENTIONS;
}

export interface SetUsernameActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USERNAME;
    payload: string;
}

export interface SetEmailActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_EMAIL;
    payload: string;
}

export interface SetPhoneActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_PHONE;
    payload: ChangePhoneResponse;
}

export interface SetCountryActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_COUNTRY;
    payload: string;
}

export interface SetGenderActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_GENDER;
    payload: string;
}

export interface SetLanguageActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_LANGUAGE;
    payload: string;
}

export interface SetDirectActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_DIRECT;
    payload: boolean;
}

export interface SetPrivateProfileActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_PRIVATE_PROFILE;
    payload: boolean;
}

export interface SetColorSchemeActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_COLOR_SCHEME;
    payload: string;
}

export interface SetBackgroundColorActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_BACKGROUND_COLOR;
    payload: string;
}

export type UserActions =
    | SetUserDataActionInterface
    | SetUserLoadingStateActionInterface
    | SetUnreadMessageActionInterface
    | SetNewNotificationActionInterface
    | ResetNotificationsActionInterface
    | SetNewMentionActionInterface
    | ResetMentionsActionInterface
    | SignOutActionInterface
    | SetUsernameActionInterface
    | SetEmailActionInterface
    | SetPhoneActionInterface
    | SetCountryActionInterface
    | SetGenderActionInterface
    | SetLanguageActionInterface
    | SetDirectActionInterface
    | SetPrivateProfileActionInterface
    | SetColorSchemeActionInterface
    | SetBackgroundColorActionInterface
    | SetFollowersSizeActionInterface
    | SetProfileStartedActionInterface
    | SetPinTweetIdActionInterface
    | SetReadMessageActionInterface
    | SetUserFollowingActionInterface
