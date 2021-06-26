import {User} from "../user/contracts/state";
import {
    FetchUserActionInterface, FetchUsersActionInterface,
    FollowUserActionInterface,
    SetUserActionInterface, SetUsersActionInterface,
    SetUsersLoadingStatusActionInterface,
    UnfollowUserActionInterface,
    UsersActionsType
} from './contracts/actionTypes';
import {UsersState} from "./contracts/state";

export const setUser = (payload: User): SetUserActionInterface => ({
    type: UsersActionsType.SET_USER,
    payload
});

export const fetchUser = (payload: string): FetchUserActionInterface => ({
    type: UsersActionsType.FETCH_USER,
    payload
});

export const setUsers = (payload: User[]): SetUsersActionInterface => ({
    type: UsersActionsType.SET_USERS,
    payload
});

export const fetchUsers = (): FetchUsersActionInterface => ({
    type: UsersActionsType.FETCH_USERS
});

export const followUser = (payload: string): FollowUserActionInterface => ({
    type: UsersActionsType.FOLLOW_USER,
    payload
});

export const unfollowUser = (payload: string): UnfollowUserActionInterface => ({
    type: UsersActionsType.UNFOLLOW_USER,
    payload
});

export const setUsersLoadingState = (payload: UsersState["loadingState"]): SetUsersLoadingStatusActionInterface => ({
    type: UsersActionsType.SET_USER_LOADING_STATE,
    payload
});
