import {
    DeleteListActionInterface,
    EditListActionInterface,
    FetchListByIdActionInterface,
    ListActionType,
    ResetListStateActionInterface,
    SetListActionInterface,
    SetListLoadingStateInterface,
    SetMembersSizeActionInterface,
    UpdateFollowToFullListActionInterface
} from "./contracts/actionTypes";
import { BaseListResponse } from "../../../types/lists";
import { EditListsRequest } from "./contracts/state";
import { LoadingStatus } from "../../../types/common";

export const setList = (payload: BaseListResponse): SetListActionInterface => ({
    type: ListActionType.SET_LIST,
    payload
});

export const updateFollowToFullList = (payload: boolean): UpdateFollowToFullListActionInterface => ({
    type: ListActionType.UPDATE_FOLLOW_TO_FULL_LIST,
    payload
});

export const setMembersSize = (payload: boolean): SetMembersSizeActionInterface => ({
    type: ListActionType.SET_MEMBERS_SIZE,
    payload
});

export const fetchListById = (payload: number): FetchListByIdActionInterface => ({
    type: ListActionType.FETCH_LIST_BY_ID,
    payload
});

export const editList = (payload: EditListsRequest): EditListActionInterface => ({
    type: ListActionType.EDIT_LIST,
    payload
});

export const deleteList = (payload: number): DeleteListActionInterface => ({
    type: ListActionType.DELETE_LIST,
    payload
});

export const resetListState = (): ResetListStateActionInterface => ({
    type: ListActionType.RESET_LIST_STATE
});

export const setListLoadingState = (payload: LoadingStatus): SetListLoadingStateInterface => ({
    type: ListActionType.SET_LOADING_STATE,
    payload
});
