import {User} from "../user/contracts/state";
import {
    FetchBlockedUsersActionInterface,
    FetchMutedUsersActionInterface,
    FetchRelevantUsersActionInterface,
    FetchUsersActionInterface,
    SetUsersActionInterface,
    SetUsersLoadingStatusActionInterface,
    UsersActionsType
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

export const fetchBlockedUsers = (): FetchBlockedUsersActionInterface => ({
    type: UsersActionsType.FETCH_BLOCKED_USERS
});

export const fetchMutedUsers = (): FetchMutedUsersActionInterface => ({
    type: UsersActionsType.FETCH_MUTED_USERS
});

export const setUsersLoadingState = (payload: UsersState["loadingState"]): SetUsersLoadingStatusActionInterface => ({
    type: UsersActionsType.SET_USER_LOADING_STATE,
    payload
});
