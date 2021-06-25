import {Action} from "redux";
import {User} from "../../user/contracts/state";
import {LoadingStatus} from "../../../types";

export enum UsersActionsType {
    SET_USER = 'users/SET_USER',
    FETCH_USER  = 'users/FETCH_USER',
    FOLLOW_USER  = 'users/FOLLOW_USER',
    UNFOLLOW_USER  = 'users/UNFOLLOW_USER',
    SET_ITEMS = 'users/SET_ITEMS',
    FETCH_ITEMS  = 'users/FETCH_TAGS',
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

export interface FollowUserActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FOLLOW_USER;
    payload: string;
}

export interface UnfollowUserActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.UNFOLLOW_USER;
    payload: string;
}

export interface SetUsersLoadingStatusActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}

export interface SetUsersItemsActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_ITEMS;
    payload: User[];
}

export interface FetchUsersItemsActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_ITEMS;
}

export type UsersActions =
    | SetUserActionInterface
    | FetchUserActionInterface
    | FollowUserActionInterface
    | UnfollowUserActionInterface
    | SetUsersItemsActionInterface
    | FetchUsersItemsActionInterface
    | SetUsersLoadingStatusActionInterface;
