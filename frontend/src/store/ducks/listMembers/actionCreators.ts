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
    SetListSuggestedActionInterface,
    SetLoadingMembersStateActionInterface,
    SetLoadingSuggestedStateActionInterface,
    SetUserToListActionInterface
} from "./contracts/actionTypes";
import {
    ListMembersState,
    ListUsersRequest,
    ProcessUserListRequest,
    SearchListUsersRequest,
    UserToListPayload
} from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const setListMembers = (payload: ListMembersState["members"]): SetListMembersActionInterface => ({
    type: ListMembersActionsType.SET_LIST_MEMBERS,
    payload
});

export const setListSuggested = (payload: ListMembersState["suggested"]): SetListSuggestedActionInterface => ({
    type: ListMembersActionsType.SET_LIST_SUGGESTED,
    payload
});

export const fetchListMembers = (payload: ListUsersRequest): FetchListMembersActionInterface => ({
    type: ListMembersActionsType.FETCH_LIST_MEMBERS,
    payload
});

export const fetchListFollowers = (payload: ListUsersRequest): FetchListFollowersActionInterface => ({
    type: ListMembersActionsType.FETCH_LIST_FOLLOWERS,
    payload
});

export const fetchListMembersByUsername = (payload: SearchListUsersRequest): FetchListMembersByUsernameActionInterface => ({
    type: ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME,
    payload
});

export const processUserToListMembers = (payload: ProcessUserListRequest): ProcessUserToListMembersActionInterface => ({
    type: ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS,
    payload
});

export const setUserToList = (payload: UserToListPayload): SetUserToListActionInterface => ({
    type: ListMembersActionsType.SET_USER_TO_LIST,
    payload
});

export const resetListMembersState = (): ResetListMembersStateActionInterface => ({
    type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE
});

export const resetListMembers = (): ResetListMembersActionInterface => ({
    type: ListMembersActionsType.RESET_LIST_MEMBERS
});

export const resetListSuggested = (): ResetListSuggestedStateActionInterface => ({
    type: ListMembersActionsType.RESET_LIST_SUGGESTED_STATE
});

export const setLoadingMembersState = (payload: LoadingStatus): SetLoadingMembersStateActionInterface => ({
    type: ListMembersActionsType.SET_LOADING_MEMBERS_STATE,
    payload
});

export const setLoadingSuggestedState = (payload: LoadingStatus): SetLoadingSuggestedStateActionInterface => ({
    type: ListMembersActionsType.SET_LOADING_SUGGESTED_STATE,
    payload
});
