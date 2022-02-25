import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {ListsOwnerMemberResponse} from "../../../types/lists";
import {AddUserToLists} from "./state";

export enum ListMembersActionsType {
    SET_LIST_MEMBERS = 'listMembers/SET_LIST_MEMBERS',
    FETCH_LIST_MEMBERS = 'listMembers/FETCH_LIST_MEMBERS',
    FETCH_LIST_MEMBERS_BY_USERNAME = 'listMembers/FETCH_LIST_MEMBERS_BY_USERNAME',
    PROCESS_USER_TO_LIST_MEMBERS = 'listMembers/PROCESS_USER_TO_LIST_MEMBERS',
    PROCESS_USER_TO_LISTS = "lists/PROCESS_USER_TO_LISTS",
    SET_USER_TO_LIST_MEMBERS = 'listMembers/SET_USER_TO_LIST_MEMBERS',
    RESET_LIST_MEMBERS_STATE = 'listMembers/RESET_LIST_MEMBERS_STATE',
    SET_LOADING_STATE = 'listMembers/SET_LOADING_STATE',
}

export interface SetListMembersActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.SET_LIST_MEMBERS;
    payload: ListsOwnerMemberResponse[];
}

export interface FetchListMembersActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.FETCH_LIST_MEMBERS;
    payload: { listId: number; listOwnerId: number; };
}

export interface FetchListMembersByUsernameActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.FETCH_LIST_MEMBERS_BY_USERNAME;
    payload: { listId: number; username: string; };
}

export interface ProcessUserToListMembersActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.PROCESS_USER_TO_LIST_MEMBERS;
    payload: { userId: number; listId: number; };
}

export interface ProcessUserToListsActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.PROCESS_USER_TO_LISTS;
    payload: AddUserToLists;
}

export interface SetUserToListMembersActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.SET_USER_TO_LIST_MEMBERS;
    payload: { userId: number; isMember: boolean; };
}

export interface ResetListMembersStateActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.RESET_LIST_MEMBERS_STATE;
}

export interface SetListMembersLoadingStateActionInterface extends Action<ListMembersActionsType> {
    type: ListMembersActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type ListMembersActions =
    | SetListMembersActionInterface
    | ResetListMembersStateActionInterface
    | SetUserToListMembersActionInterface
    | SetListMembersLoadingStateActionInterface;
