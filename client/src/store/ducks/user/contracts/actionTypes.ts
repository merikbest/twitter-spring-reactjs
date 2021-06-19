import {Action} from "redux";

import {LoginFormProps} from "../../../../pages/SignIn/LoginModal";
import {RegisterFormProps} from "../../../../pages/SignIn/RegisterModal";
import {LoadingStatus} from "../../../types";
import {UserState} from "./state";

export enum UserActionsType {
    FETCH_SIGN_IN = "user/FETCH_SIGN_IN",
    FETCH_SIGN_UP = 'user/FETCH_SIGN_UP',
    SET_USER_DATA = "user/SET_USER_DATA",
    FETCH_USER_DATA = 'user/FETCH_USER_DATA',
    SET_USER_LOADING_STATE = "user/SET_USER_LOADING_STATE",
    SIGN_OUT = 'user/SIGN_OUT'
}

export interface SignOutActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SIGN_OUT;
}

export interface FetchSignInActionInterface extends Action<UserActionsType> {
    type: UserActionsType.FETCH_SIGN_IN;
    payload: LoginFormProps;
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

export interface SetUserLoadingStateActionInterface extends Action<UserActionsType> {
    type: UserActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}

export type UserActions =
    | SetUserDataActionInterface
    | SetUserLoadingStateActionInterface
    | FetchUserDataActionInterface
    | SignOutActionInterface;
