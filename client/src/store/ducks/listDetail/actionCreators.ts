import {CancelTokenSource} from "axios";
import {LoadingStatus} from "../../types";
import {
    FetchListDetailActionInterface,
    ListDetailActionsType,
    ResetListDetailStateActionInterface,
    SetListDetailActionInterface,
    SetListDetailLoadingStateActionInterface,
    UpdateFollowListDetailActionInterface
} from "./contracts/actionTypes";
import {BaseListResponse} from "../../types/lists";

export const setListDetail = (payload: BaseListResponse): SetListDetailActionInterface => ({
    type: ListDetailActionsType.SET_LIST_DETAIL,
    payload,
});

export const fetchListDetail = (payload: { listId: number, cancelTokenSource: CancelTokenSource }): FetchListDetailActionInterface => ({
    type: ListDetailActionsType.FETCH_LIST_DETAIL,
    payload,
});

export const updateFollowListDetail = (payload: boolean): UpdateFollowListDetailActionInterface => ({
    type: ListDetailActionsType.UPDATE_FOLLOW_LIST_DETAIL,
    payload,
});

export const resetListDetailState = (): ResetListDetailStateActionInterface => ({
    type: ListDetailActionsType.RESET_LIST_DETAIL_STATE,
});

export const setListDetailLoadingState = (payload: LoadingStatus): SetListDetailLoadingStateActionInterface => ({
    type: ListDetailActionsType.SET_LOADING_STATE,
    payload,
});
