import {
    FetchListByIdActionInterface,
    ListActionType,
    SetListActionInterface,
    SetListLoadingStateInterface
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types";
import {Lists} from "../lists/contracts/state";

export const setList = (payload: Lists): SetListActionInterface => ({
    type: ListActionType.SET_LIST,
    payload
});

export const fetchListById = (payload: string): FetchListByIdActionInterface => ({
    type: ListActionType.FETCH_LIST_BY_ID,
    payload
});

export const setListLoadingState = (payload: LoadingStatus): SetListLoadingStateInterface => ({
    type: ListActionType.SET_LOADING_STATE,
    payload
});
