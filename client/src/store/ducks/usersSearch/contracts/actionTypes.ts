import {Action} from "redux";
import {User} from "../../user/contracts/state";
import {LoadingStatus} from "../../../types";

export enum UsersSearchActionsType {
    SET_USERS = 'usersSearch/SET_USERS',
    FETCH_USERS  = 'usersSearch/FETCH_USERS',
    FETCH_USERS_BY_NAME  = 'usersSearch/FETCH_USERS_BY_NAME',
    FETCH_FOLLOWERS  = 'usersSearch/FETCH_FOLLOWERS',
    FETCH_FOLLOWINGS  = 'usersSearch/FETCH_FOLLOWINGS',
    RESET_USERS_STATE = 'usersSearch/RESET_USERS_STATE',
    SET_USERS_LOADING_STATE = 'usersSearch/SET_USER_LOADING_STATE',
}

export interface SetUsersSearchActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_USERS;
    payload: User[];
}

export interface FetchUsersSearchActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.FETCH_USERS;
}

export interface FetchUsersSearchByNameActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.FETCH_USERS_BY_NAME;
    payload: string;
}

export interface FetchFollowersActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.FETCH_FOLLOWERS;
    payload: string;
}

export interface FetchFollowingsActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.FETCH_FOLLOWINGS;
    payload: string;
}

export interface ResetUsersStateActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.RESET_USERS_STATE;
}

export interface SetUsersSearchLoadingStatusActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_USERS_LOADING_STATE;
    payload: LoadingStatus;
}

export type UsersSearchActions =
    | SetUsersSearchActionInterface
    | ResetUsersStateActionInterface
    | SetUsersSearchLoadingStatusActionInterface;
