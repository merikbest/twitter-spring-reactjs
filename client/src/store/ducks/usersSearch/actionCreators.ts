import {User} from "../user/contracts/state";
import {
    FetchFollowersActionInterface,
    FetchFollowingsActionInterface,
    FetchUsersSearchActionInterface,
    FetchUsersSearchByNameActionInterface,
    ResetUsersStateActionInterface,
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

export const fetchFollowers = (payload: string): FetchFollowersActionInterface => ({
    type: UsersSearchActionsType.FETCH_FOLLOWERS,
    payload
});

export const fetchFollowings = (payload: string): FetchFollowingsActionInterface => ({
    type: UsersSearchActionsType.FETCH_FOLLOWINGS,
    payload
});

export const fetchUsersSearchByUsername = (payload: string): FetchUsersSearchByNameActionInterface => ({
    type: UsersSearchActionsType.FETCH_USERS_BY_NAME,
    payload
});

export const resetUsersState = (): ResetUsersStateActionInterface => ({
    type: UsersSearchActionsType.RESET_USERS_STATE,
});

export const setUsersSearchLoadingState = (payload: UsersSearchState["loadingState"]): SetUsersSearchLoadingStatusActionInterface => ({
    type: UsersSearchActionsType.SET_USERS_LOADING_STATE,
    payload
});
