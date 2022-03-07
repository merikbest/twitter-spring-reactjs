import {
    BlockedAndMutedUsersActionsType,
    FetchBlockedUsersActionInterface,
    FetchMutedUsersActionInterface,
    ResetBlockedAndMutedUsersStateActionInterface,
    SetBlockedAndMutedUsersLoadingStateActionInterface,
    SetBlockedUserActionInterface,
    SetBlockedUsersActionInterface,
    SetMutedUserActionInterface,
    SetMutedUsersActionInterface
} from "./contracts/actionTypes";
import {BlockedUserResponse, MutedUserResponse} from "../../types/user";
import {LoadingStatus} from "../../types";

export const setBlockedUsers = (payload: BlockedUserResponse[]): SetBlockedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USERS,
    payload,
});

export const setMutedUsers = (payload: MutedUserResponse[]): SetMutedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_MUTED_USERS,
    payload,
});

export const setBlockedUser = (payload: { userId: number; isUserBlocked: boolean }): SetBlockedUserActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USER,
    payload,
});

export const setMutedUser = (payload: { userId: number; isUserMuted: boolean }): SetMutedUserActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_MUTED_USER,
    payload,
});

export const fetchBlockedUsers = (): FetchBlockedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.FETCH_BLOCKED_USERS
});

export const fetchMutedUsers = (): FetchMutedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.FETCH_MUTED_USERS
});

export const resetBlockedAndMutedUsersState = (): ResetBlockedAndMutedUsersStateActionInterface => ({
    type: BlockedAndMutedUsersActionsType.RESET_TAGS_STATE,
});

export const setBlockedAndMutedUsersLoadingState = (payload: LoadingStatus): SetBlockedAndMutedUsersLoadingStateActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_LOADING_STATE,
    payload,
});
