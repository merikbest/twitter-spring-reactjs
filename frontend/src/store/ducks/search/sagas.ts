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
import { UserApi } from "../../../services/api/user-service/userApi";
import { SEARCH_TERMS } from "../../../constants/common-constants";

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
        const localStorageItem = localStorage.getItem(SEARCH_TERMS);
        yield put(setRecentSearchResult({
            text: localStorageItem ? (JSON.parse(localStorageItem).text ?? []) : [],
            tags: localStorageItem ? (JSON.parse(localStorageItem).tags ?? []) : [],
            users: response.data
        }));
    } catch (error) {
        yield put(setSearchLoadingState(LoadingStatus.ERROR));
    }
}

export function* searchSaga() {
    yield takeLatest(SearchActionsType.FETCH_SEARCH_BY_TEXT, fetchSearchByTextRequest);
    yield takeLatest(SearchActionsType.FETCH_RECENT_SEARCH_RESULT, fetchRecentSearchResultRequest);
}
