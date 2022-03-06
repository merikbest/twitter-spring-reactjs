import {LoadingStatus} from '../../types';
import {
    FetchListFollowersActionInterface,
    FetchListMembersActionInterface,
    FetchListMembersByUsernameActionInterface,
    ListMembersActionsType,
    ProcessUserToListMembersActionInterface,
    ResetListMembersActionInterface,
    ResetListMembersStateActionInterface,
    ResetListSuggestedStateActionInterface,
    SetListMembersActionInterface,
    SetListMembersLoadingStateActionInterface,
    SetListSuggestedActionInterface,
    SetLoadingMembersStateActionInterface,
    SetLoadingSuggestedStateActionInterface,
    SetUserToListMembersActionInterface,
} from './contracts/actionTypes';
import {ListsOwnerMemberResponse} from "../../types/lists";

export const setListMembers = (payload: ListsOwnerMemberResponse[]): SetListMembersActionInterface => ({
    type: ListMembersActionsType.SET_LIST_MEMBERS,
    payload,
});

export const setListSuggested = (payload: ListsOwnerMemberResponse[]): SetListSuggestedActionInterface => ({
    type: ListMembersActionsType.SET_LIST_SUGGESTED,
    payload,
});

export const fetchListMembers = (payload: { listId: number; listOwnerId: number; }): FetchListMembersActionInterface => ({
    type: ListMembersActionsType.FETCH_LIST_MEMBERS,
    payload,
});

export const fetchListFollowers = (payload: { listId: number; listOwnerId: number; }): FetchListFollowersActionInterface => ({
    type: ListMembersActionsType.FETCH_LIST_FOLLOWERS,
    payload,
});

export const fetchListMembersByUsername = (payload: { listId: number; username: string; }): FetchListMembersByUsernameActionInterface => ({
    type: ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME,
    payload,
});

export const processUserToListMembers = (payload: { userId: number; listId: number; }): ProcessUserToListMembersActionInterface => ({
    type: ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS,
    payload,
});

export const setUserToListMembers = (payload: { userId: number; isMember: boolean; }): SetUserToListMembersActionInterface => ({
    type: ListMembersActionsType.SET_USER_TO_LIST_MEMBERS,
    payload,
});

export const resetListMembersState = (): ResetListMembersStateActionInterface => ({
    type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE,
});

export const resetListMembers = (): ResetListMembersActionInterface => ({
    type: ListMembersActionsType.RESET_LIST_MEMBERS,
});

export const resetListSuggested = (): ResetListSuggestedStateActionInterface => ({
    type: ListMembersActionsType.RESET_LIST_SUGGESTED_STATE,
});

export const setListMembersLoadingState = (payload: LoadingStatus): SetListMembersLoadingStateActionInterface => ({
    type: ListMembersActionsType.SET_LOADING_STATE,
    payload,
});

export const setLoadingMembersState = (payload: LoadingStatus): SetLoadingMembersStateActionInterface => ({
    type: ListMembersActionsType.SET_LOADING_MEMBERS_STATE,
    payload,
});

export const setLoadingSuggestedState = (payload: LoadingStatus): SetLoadingSuggestedStateActionInterface => ({
    type: ListMembersActionsType.SET_LOADING_SUGGESTED_STATE,
    payload,
});
