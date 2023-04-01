import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { setListDetail, setListDetailLoadingState } from "./actionCreators";
import { FetchListDetailActionInterface, ListDetailActionsType } from "./contracts/actionTypes";
import { ListsApi } from "../../../services/api/lists-service/listsApi";
import { BaseListResponse } from "../../../types/lists";
import { LoadingStatus } from "../../../types/common";

export function* fetchListDetailRequest({ payload }: FetchListDetailActionInterface) {
    try {
        yield put(setListDetailLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<BaseListResponse> = yield call(ListsApi.getListDetails, payload.listId, payload.cancelTokenSource);
        yield put(setListDetail(response.data));
    } catch (error) {
        yield put(setListDetailLoadingState(LoadingStatus.ERROR));
    }
}

export function* listDetailSaga() {
    yield takeLatest(ListDetailActionsType.FETCH_LIST_DETAIL, fetchListDetailRequest);
}
