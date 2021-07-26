import {Action} from "redux";

import {LoginFormProps} from "../../../../pages/SignIn/LoginModal";
import {RegisterFormProps} from "../../../../pages/SignIn/RegisterModal";
import {LoadingStatus} from "../../../types";
import {User, UserState} from "./state";

export enum UserActionsType {
    FETCH_SIGN_IN = "user/FETCH_SIGN_IN",
    SIGN_IN_ERROR = "user/SIGN_IN_ERROR",
    FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
    SET_USER_DATA = "user/SET_USER_DATA",
    UPDATE_USER_DATA = "user/UPDATE_USER_DATA",
    FETCH_USER_DATA = 'user/FETCH_USER_DATA',
    SET_USER_LOADING_STATE = "user/SET_USER_LOADING_STATE",
    SIGN_OUT = 'user/SIGN_OUT',
    FOLLOW_USER = 'user/FOLLOW_USER',
    UNFOLLOW_USER = 'user/UNFOLLOW_USER',
}

export interface SignOutActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SIGN_OUT;
}

export interface FetchSignInActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_IN;
    payload: LoginFormProps;
}

export interface SignInErrorActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SIGN_IN_ERROR;
    payload: number;
}

export interface FetchSignUpActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_UP;
    payload: RegisterFormProps;
}

export interface FetchUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_USER_DATA;
}

export interface SetUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_DATA;
    payload: UserState["data"] | undefined;
}

export interface UpdateUserDataActionInterface extends Action<UserActionsType> {
    type: UserActionsType.UPDATE_USER_DATA;
    payload: User;
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

export type UserActions =
    | SetUserDataActionInterface
    | SetUserLoadingStateActionInterface
    | FetchUserDataActionInterface
    | SignOutActionInterface
    | SignInErrorActionInterface
    | UpdateUserDataActionInterface
    | FollowUserActionInterface
    | UnfollowUserActionInterface;
