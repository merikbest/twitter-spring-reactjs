import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import {
    FetchRecentSearchResultActionInterface,
    FetchSearchByTextActionInterface,
    SearchActionsType
} from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";
import { setRecentSearchResult, setSearchLoadingState, setSearchResult } from "./actionCreators";
import { CommonUserResponse, SearchResultResponse } from "../../../types/user";
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

export function* fetchRecentSearchResultRequest({ payload }: FetchRecentSearchResultActionInterface) {
    try {
        yield put(setSearchLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<CommonUserResponse[]> = yield call(UserApi.getSearchResults, payload);
        yield put(setRecentSearchResult(response.data));
    } catch (error) {
        yield put(setSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* searchSaga() {
    yield takeLatest(SearchActionsType.FETCH_SEARCH_BY_TEXT, fetchSearchByTextRequest);
    yield takeLatest(SearchActionsType.FETCH_RECENT_SEARCH_RESULT, fetchRecentSearchResultRequest);
}
