import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {Settings, User, UserState} from "./state";
import {RegistrationProps} from "../../../../pages/RegistrationModal/SetPasswordModal/SetPasswordModal";
import {LoginProps} from "../../../../pages/Login/Login";
import {ChatMessage} from "../../chatMessages/contracts/state";

export enum UserActionsType {
    FETCH_SIGN_IN = "user/FETCH_SIGN_IN",
    FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
    SET_USER_DATA = "user/SET_USER_DATA",
    FETCH_USER_DATA = 'user/FETCH_USER_DATA',
    SET_USER_LOADING_STATE = "user/SET_USER_LOADING_STATE",
    SIGN_OUT = 'user/SIGN_OUT',
    FOLLOW_USER = 'user/FOLLOW_USER',
    UNFOLLOW_USER = 'user/UNFOLLOW_USER',
    FOLLOW = 'user/FOLLOW',
    UNFOLLOW = 'user/UNFOLLOW',
    ACCEPT_FOLLOW_REQUEST = 'user/ACCEPT_FOLLOW_REQUEST',
    DECLINE_FOLLOW_REQUEST = 'user/DECLINE_FOLLOW_REQUEST',
    FETCH_PIN_TWEET = 'user/FETCH_PIN_TWEET',
    ADD_TWEET_TO_BOOKMARKS = 'user/ADD_TWEET_TO_BOOKMARKS',
    START_USE_TWITTER = 'user/START_USE_TWITTER',
    FETCH_READ_MESSAGES = 'user/FETCH_READ_MESSAGES',
    SET_UNREAD_MESSAGE = 'user/SET_UNREAD_MESSAGE',
    SET_NEW_NOTIFICATION = 'user/SET_NEW_NOTIFICATION',
    ADD_USER_TO_BLOCKLIST = 'user/ADD_USER_TO_BLOCKLIST',
    ADD_USER_TO_MUTELIST = 'user/ADD_USER_TO_MUTELIST',
    UPDATE_USERNAME = 'user/UPDATE_USERNAME',
    UPDATE_EMAIL = 'user/UPDATE_EMAIL',
    UPDATE_PHONE = 'user/UPDATE_PHONE',
    UPDATE_COUNTRY = 'user/UPDATE_COUNTRY',
    UPDATE_GENDER = 'user/UPDATE_GENDER',
    UPDATE_LANGUAGE = 'user/UPDATE_LANGUAGE',
    UPDATE_DIRECT = 'user/UPDATE_DIRECT',
    UPDATE_PRIVATE_PROFILE = 'user/UPDATE_PRIVATE_PROFILE',
    UPDATE_COLOR_SCHEME = 'user/UPDATE_COLOR_SCHEME',
    UPDATE_BACKGROUND_COLOR = 'user/UPDATE_BACKGROUND_COLOR',
    SET_USERNAME = 'user/SET_USERNAME',
    SET_EMAIL = 'user/SET_EMAIL',
    SET_PHONE = 'user/SET_PHONE',
    SET_COUNTRY = 'user/SET_COUNTRY',
    SET_GENDER = 'user/SET_GENDER',
    SET_LANGUAGE = 'user/SET_LANGUAGE',
    SET_DIRECT = 'user/SET_DIRECT',
    SET_PRIVATE_PROFILE = 'user/SET_PRIVATE_PROFILE',
    SET_COLOR_SCHEME = 'user/SET_COLOR_SCHEME',
    SET_BACKGROUND_COLOR = 'user/SET_BACKGROUND_COLOR',
}

export interface SignOutActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SIGN_OUT;
}

export interface FetchSignInActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_IN;
    payload: LoginProps;
}

export interface FetchSignUpActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_UP;
    payload: RegistrationProps;
}

export interface FetchUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_USER_DATA;
}

export interface SetUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_DATA;
    payload: UserState["data"] | undefined;
}

export interface SetUserLoadingStateActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}

export interface FollowUserActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FOLLOW_USER;
    payload: User;
}

export interface UnfollowUserActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UNFOLLOW_USER;
    payload: User;
}

export interface FollowActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FOLLOW;
    payload: User;
}

export interface UnfollowActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UNFOLLOW;
    payload: User;
}

export interface AcceptFollowRequestActionInterface extends Action<UserActionsType> {
    type: UserActionsType.ACCEPT_FOLLOW_REQUEST;
    payload: number;
}

export interface DeclineFollowRequestActionInterface extends Action<UserActionsType> {
    type: UserActionsType.DECLINE_FOLLOW_REQUEST;
    payload: number;
}

export interface FetchPinTweetActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_PIN_TWEET;
    payload: string;
}

export interface AddTweetToBookmarksActionInterface extends Action<UserActionsType> {
    type: UserActionsType.ADD_TWEET_TO_BOOKMARKS;
    payload: string;
}

export interface StartUseTwitterActionInterface extends Action<UserActionsType> {
    type: UserActionsType.START_USE_TWITTER;
    payload: number;
}

export interface FetchReadMessagesActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_READ_MESSAGES;
    payload: number;
}

export interface SetUnreadMessageActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_UNREAD_MESSAGE;
    payload: ChatMessage;
}

export interface SetNewNotificationActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_NEW_NOTIFICATION;
}

export interface AddUserToBlocklistActionInterface extends Action<UserActionsType> {
    type: UserActionsType.ADD_USER_TO_BLOCKLIST;
    payload: number;
}

export interface AddUserToMuteListActionInterface extends Action<UserActionsType> {
    type: UserActionsType.ADD_USER_TO_MUTELIST;
    payload: number;
}

export interface UpdateUsernameActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_USERNAME;
    payload: Settings;
}

export interface UpdateEmailActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_EMAIL;
    payload: Settings;
}

export interface UpdatePhoneActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_PHONE;
    payload: Settings;
}

export interface UpdateCountryActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_COUNTRY;
    payload: Settings;
}

export interface UpdateGenderActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_GENDER;
    payload: Settings;
}

export interface UpdateLanguageActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_LANGUAGE;
    payload: Settings;
}

export interface UpdateDirectActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_DIRECT;
    payload: Settings;
}

export interface UpdatePrivateProfileActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_PRIVATE_PROFILE;
    payload: Settings;
}

export interface UpdateColorSchemeActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_COLOR_SCHEME;
    payload: Settings;
}

export interface UpdateBackgroundColorActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_BACKGROUND_COLOR;
    payload: Settings;
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
    payload: { countryCode: string; phone: number };
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
    | SignOutActionInterface
    | FollowUserActionInterface
    | UnfollowUserActionInterface
    | FollowActionInterface
    | UnfollowActionInterface
    | SetUsernameActionInterface
    | SetEmailActionInterface
    | SetPhoneActionInterface
    | SetCountryActionInterface
    | SetGenderActionInterface
    | SetLanguageActionInterface
    | SetDirectActionInterface
    | SetPrivateProfileActionInterface
    | SetColorSchemeActionInterface
    | SetBackgroundColorActionInterface;
