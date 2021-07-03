import {User} from "../user/contracts/state";
import {
    FetchRelevantUsersActionInterface,
    SetUsersActionInterface,
    SetUsersLoadingStatusActionInterface,
    UsersActionsType,
    FetchUsersActionInterface
} from './contracts/actionTypes';
import {UsersState} from "./contracts/state";

export const setUsers = (payload: User[]): SetUsersActionInterface => ({
    type: UsersActionsType.SET_USERS,
    payload
});

export const fetchUsers = (): FetchUsersActionInterface => ({
    type: UsersActionsType.FETCH_USERS
});

export const fetchRelevantUsers = (): FetchRelevantUsersActionInterface => ({
    type: UsersActionsType.FETCH_RELEVANT_USERS
});

export const setUsersLoadingState = (payload: UsersState["loadingState"]): SetUsersLoadingStatusActionInterface => ({
    type: UsersActionsType.SET_USER_LOADING_STATE,
    payload
});
