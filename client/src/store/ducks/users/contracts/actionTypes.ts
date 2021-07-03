import {Action} from "redux";
import {User} from "../../user/contracts/state";
import {LoadingStatus} from "../../../types";

export enum UsersActionsType {
    SET_USERS = 'users/SET_USERS',
    FETCH_USERS  = 'users/FETCH_USERS',
    FETCH_RELEVANT_USERS  = 'users/FETCH_RELEVANT_USERS',
    SET_USER_LOADING_STATE = 'users/SET_USER_LOADING_STATE',
}

export interface SetUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_USERS;
    payload: User[];
}

export interface FetchUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_USERS;
}

export interface FetchRelevantUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_RELEVANT_USERS;
}

export interface SetUsersLoadingStatusActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}
export type UsersActions =
    | SetUsersActionInterface
    | SetUsersLoadingStatusActionInterface;
