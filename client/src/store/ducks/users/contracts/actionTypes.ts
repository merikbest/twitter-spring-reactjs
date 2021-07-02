import {Action} from "redux";
import {User} from "../../user/contracts/state";
import {LoadingStatus} from "../../../types";

export enum UsersActionsType {
    SET_USER = 'users/SET_USER',
    FETCH_USER  = 'users/FETCH_USER',
    FETCH_USERS  = 'users/FETCH_USERS',
    FOLLOW_USER  = 'users/FOLLOW_USER',
    UNFOLLOW_USER  = 'users/UNFOLLOW_USER',
    SET_USERS = 'users/SET_USERS',
    FETCH_RELEVANT_USERS  = 'users/FETCH_RELEVANT_USERS',
    SET_USER_LOADING_STATE = 'users/SET_USER_LOADING_STATE',
}

export interface SetUserActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_USER;
    payload: User;
}

export interface FetchUserActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_USER;
    payload: string;
}

export interface FetchUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_USERS;
}

export interface FollowUserActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FOLLOW_USER;
    payload: User;
}

export interface UnfollowUserActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.UNFOLLOW_USER;
    payload: User;
}

export interface SetUsersLoadingStatusActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_USERS;
    payload: User[];
}

export interface FetchRelevantUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_RELEVANT_USERS;
}

export type UsersActions =
    | SetUserActionInterface
    | SetUsersActionInterface
    | SetUsersLoadingStatusActionInterface
    | FollowUserActionInterface
    | UnfollowUserActionInterface;
