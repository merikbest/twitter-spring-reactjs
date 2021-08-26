import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {User, UserState} from "./state";
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
    FOLLOW  = 'user/FOLLOW',
    UNFOLLOW  = 'user/UNFOLLOW',
    FETCH_PIN_TWEET  = 'user/FETCH_PIN_TWEET',
    FETCH_UNPIN_TWEET  = 'user/FETCH_UNPIN_TWEET',
    ADD_TWEET_TO_BOOKMARKS  = 'user/ADD_TWEET_TO_BOOKMARKS',
    START_USE_TWITTER = 'user/START_USE_TWITTER',
    FETCH_READ_MESSAGES = 'user/FETCH_READ_MESSAGES',
    SET_UNREAD_MESSAGE = 'user/SET_UNREAD_MESSAGE',
    SET_NEW_NOTIFICATION = 'user/SET_NEW_NOTIFICATION',
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

export interface FetchPinTweetActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_PIN_TWEET;
    payload: string;
}

export interface FetchUnpinTweetActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_UNPIN_TWEET;
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

export type UserActions =
    | SetUserDataActionInterface
    | SetUserLoadingStateActionInterface
    | SetUnreadMessageActionInterface
    | SetNewNotificationActionInterface
    | SignOutActionInterface
    | FollowUserActionInterface
    | UnfollowUserActionInterface
    | FollowActionInterface
    | UnfollowActionInterface;
