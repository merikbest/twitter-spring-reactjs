import {User} from "../user/contracts/state";
import {
    FetchUsersSearchActionInterface,
    FetchUsersSearchByNameActionInterface,
    SetUsersSearchActionInterface,
    SetUsersSearchLoadingStatusActionInterface,
    UsersSearchActionsType
} from './contracts/actionTypes';
import {UsersSearchState} from "./contracts/state";

export const setUsersSearch = (payload: User[]): SetUsersSearchActionInterface => ({
    type: UsersSearchActionsType.SET_USERS,
    payload
});

export const fetchUsersSearch = (): FetchUsersSearchActionInterface => ({
    type: UsersSearchActionsType.FETCH_USERS
});

export const fetchUsersSearchByUsername = (payload: string): FetchUsersSearchByNameActionInterface => ({
    type: UsersSearchActionsType.FETCH_USERS_BY_NAME,
    payload
});

export const setUsersSearchLoadingState = (payload: UsersSearchState["loadingState"]): SetUsersSearchLoadingStatusActionInterface => ({
    type: UsersSearchActionsType.SET_USER_LOADING_STATE,
    payload
});
