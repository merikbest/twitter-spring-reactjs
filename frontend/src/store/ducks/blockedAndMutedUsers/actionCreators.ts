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
import { BlockedAndMutedUsersState, BlockedUserPayload, MutedUserPayload } from "./contracts/state";
import { LoadingStatus, PageableResponse } from "../../../types/common";

export const setBlockedUsers = (payload: PageableResponse<BlockedAndMutedUsersState["blockedUsers"]>): SetBlockedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USERS,
    payload
});

export const setMutedUsers = (payload: PageableResponse<BlockedAndMutedUsersState["mutedUsers"]>): SetMutedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_MUTED_USERS,
    payload
});

export const setBlockedUser = (payload: BlockedUserPayload): SetBlockedUserActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_BLOCKED_USER,
    payload
});

export const setMutedUser = (payload: MutedUserPayload): SetMutedUserActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_MUTED_USER,
    payload
});

export const fetchBlockedUsers = (payload: number): FetchBlockedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.FETCH_BLOCKED_USERS,
    payload
});

export const fetchMutedUsers = (payload: number): FetchMutedUsersActionInterface => ({
    type: BlockedAndMutedUsersActionsType.FETCH_MUTED_USERS,
    payload
});

export const resetBlockedAndMutedUsersState = (): ResetBlockedAndMutedUsersStateActionInterface => ({
    type: BlockedAndMutedUsersActionsType.RESET_TAGS_STATE
});

export const setBlockedAndMutedUsersLoadingState = (payload: LoadingStatus): SetBlockedAndMutedUsersLoadingStateActionInterface => ({
    type: BlockedAndMutedUsersActionsType.SET_LOADING_STATE,
    payload
});
