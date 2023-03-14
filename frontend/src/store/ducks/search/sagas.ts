import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { FetchSearchByTextActionInterface, SearchActionsType } from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";
import { setSearchLoadingState, setSearchResult } from "./actionCreators";
import { SearchResultResponse } from "../../../types/user";
import { UserApi } from "../../../services/api/userApi";

export function* fetchSearchByTextRequest({ payload }: FetchSearchByTextActionInterface) {
    try {
        yield put(setSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<SearchResultResponse> = yield call(UserApi.searchByText, payload);
        yield put(setSearchResult(response.data));
    } catch (error) {
        yield put(setSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* searchSaga() {
    yield takeLatest(SearchActionsType.FETCH_SEARCH_BY_TEXT, fetchSearchByTextRequest);
}
