import { call, put, takeEvery } from "redux-saga/effects";
import { AxiosResponse } from "axios";

import {
    DeleteListActionInterface,
    EditListActionInterface,
    FetchListByIdActionInterface,
    FetchTweetsByListIdActionInterface,
    ListActionType
} from "./contracts/actionTypes";
import { setList, setListLoadingState, setListTweets, setTweetsLoadingState } from "./actionCreators";
import { ListsApi } from "../../../services/api/lists-service/listsApi";
import { BaseListResponse } from "../../../types/lists";
import { LoadingStatus } from "../../../types/common";
import { TweetResponse } from "../../../types/tweet";
import { PAGE_TOTAL_COUNT } from "../../../constants/common-constants";

export function* fetchListByIdRequest({ payload }: FetchListByIdActionInterface) {
    try {
        yield put(setListLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<BaseListResponse> = yield call(ListsApi.getListById, payload);
        yield put(setList(response.data));
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsByListIdRequest({ payload }: FetchTweetsByListIdActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetResponse[]> = yield call(ListsApi.getTweetsByListId, payload.listId, payload.pageNumber);
        yield put(setListTweets({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* deleteListRequest({ payload }: DeleteListActionInterface) {
    try {
        yield call(ListsApi.deleteList, payload);
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* editListRequest({ payload }: EditListActionInterface) {
    try {
        yield put(setListLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<BaseListResponse> = yield call(ListsApi.editList, payload);
        yield put(setList(response.data));
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* listSaga() {
    yield takeEvery(ListActionType.FETCH_LIST_BY_ID, fetchListByIdRequest);
    yield takeEvery(ListActionType.FETCH_TWEETS_BY_LIST_ID, fetchTweetsByListIdRequest);
    yield takeEvery(ListActionType.DELETE_LIST, deleteListRequest);
    yield takeEvery(ListActionType.EDIT_LIST, editListRequest);
}
