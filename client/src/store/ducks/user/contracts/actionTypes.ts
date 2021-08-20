import {Action} from "redux";

import {LoadingStatus} from "../../../types";
import {User, UserState} from "./state";
import {RegistrationProps} from "../../../../pages/RegistrationModal/SetPasswordModal/SetPasswordModal";
import {LoginProps} from "../../../../pages/Login/Login";

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

export type UserActions =
    | SetUserDataActionInterface
    | SetUserLoadingStateActionInterface
    | SignOutActionInterface
    | FollowUserActionInterface
    | UnfollowUserActionInterface
    | FollowActionInterface
    | UnfollowActionInterface;
