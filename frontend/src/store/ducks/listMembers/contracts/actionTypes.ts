import { Action } from "redux";

import {
    ListMembersState,
    ListUsersRequest,
    ProcessUserListRequest,
    SearchListUsersRequest,
    UserToListPayload
} from "./state";
import { LoadingStatus } from "../../../../types/common";

export enum ListMembersActionsType {
    SET_LIST_MEMBERS = "listMembers/SET_LIST_MEMBERS",
    SET_LIST_SUGGESTED = "listMembers/SET_LIST_SUGGESTED",
    FETCH_LIST_MEMBERS = "listMembers/FETCH_LIST_MEMBERS",
    FETCH_LIST_FOLLOWERS = "listMembers/FETCH_LIST_FOLLOWERS",
    FETCH_LIST_MEMBERS_BY_USERNAME = "listMembers/FETCH_LIST_MEMBERS_BY_USERNAME",
    PROCESS_USER_TO_LIST_MEMBERS = "listMembers/PROCESS_USER_TO_LIST_MEMBERS",
    SET_USER_TO_LIST = "listMembers/SET_USER_TO_LIST",
    RESET_LIST_MEMBERS_STATE = "listMembers/RESET_LIST_MEMBERS_STATE",
    RESET_LIST_SUGGESTED_STATE = "listMembers/RESET_LIST_SUGGESTED_STATE",
    RESET_LIST_MEMBERS = "listMembers/RESET_LIST_MEMBERS",
    SET_LOADING_MEMBERS_STATE = "listMembers/SET_LOADING_MEMBERS_STATE",
    SET_LOADING_SUGGESTED_STATE = "listMembers/SET_LOADING_SUGGESTED_STATE",
}

export interface SetListMembersActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.SET_LIST_MEMBERS;
    payload: ListMembersState["members"];
}

export interface SetListSuggestedActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.SET_LIST_SUGGESTED;
    payload: ListMembersState["suggested"];
}

export interface FetchListMembersActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.FETCH_LIST_MEMBERS;
    payload: ListUsersRequest;
}

export interface FetchListFollowersActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.FETCH_LIST_FOLLOWERS;
    payload: ListUsersRequest;
}

export interface FetchListMembersByUsernameActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME;
    payload: SearchListUsersRequest;
}

export interface ProcessUserToListMembersActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS;
    payload: ProcessUserListRequest;
}

export interface SetUserToListActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.SET_USER_TO_LIST;
    payload: UserToListPayload;
}

export interface ResetListMembersStateActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE;
}

export interface ResetListSuggestedStateActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.RESET_LIST_SUGGESTED_STATE;
}

export interface ResetListMembersActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.RESET_LIST_MEMBERS;
}

export interface SetLoadingMembersStateActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.SET_LOADING_MEMBERS_STATE;
    payload: LoadingStatus;
}

export interface SetLoadingSuggestedStateActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.SET_LOADING_SUGGESTED_STATE;
    payload: LoadingStatus;
}

export type ListMembersActions =
    | SetListMembersActionInterface
    | SetListSuggestedActionInterface
    | ResetListMembersStateActionInterface
    | ResetListSuggestedStateActionInterface
    | ResetListMembersActionInterface
    | SetUserToListActionInterface
    | SetLoadingMembersStateActionInterface
    | SetLoadingSuggestedStateActionInterface
