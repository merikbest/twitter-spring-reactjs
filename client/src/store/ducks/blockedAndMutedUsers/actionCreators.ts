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
import {LoadingStatus} from "../../types";
import {BlockedAndMutedUsersState, BlockedUserPayload, MutedUserPayload} from "./contracts/state";

export const setBlockedUsers = (payload: BlockedAndMutedUsersState["blockedUsers"]): SetBlockedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USERS,
    payload,
});

export const setMutedUsers = (payload: BlockedAndMutedUsersState["mutedUsers"]): SetMutedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_MUTED_USERS,
    payload,
});

export const setBlockedUser = (payload: BlockedUserPayload): SetBlockedUserActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USER,
    payload,
});

export const setMutedUser = (payload: MutedUserPayload): SetMutedUserActionInterface => ({
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
