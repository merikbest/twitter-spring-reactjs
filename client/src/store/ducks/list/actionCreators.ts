import {
    DeleteListActionInterface,
    EditListActionInterface,
    FetchListByIdActionInterface,
    ListActionType,
    SetListActionInterface,
    SetListLoadingStateInterface,
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {EditLists, Lists} from "../lists/contracts/state";

export const setList = (payload: Lists): SetListActionInterface => ({
    type: ListActionType.SET_LIST,
    payload
});

export const fetchListById = (payload: string): FetchListByIdActionInterface => ({
    type: ListActionType.FETCH_LIST_BY_ID,
    payload
});

export const editList = (payload: EditLists): EditListActionInterface => ({
    type: ListActionType.EDIT_LIST,
    payload
});

export const deleteList = (payload: number): DeleteListActionInterface => ({
    type: ListActionType.DELETE_LIST,
    payload
});

export const setListLoadingState = (payload: LoadingStatus): SetListLoadingStateInterface => ({
    type: ListActionType.SET_LOADING_STATE,
    payload
});
