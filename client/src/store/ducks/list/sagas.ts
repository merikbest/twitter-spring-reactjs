import {call, put, takeEvery} from 'redux-saga/effects';

import {
    DeleteListActionInterface,
    EditListActionInterface,
    FetchListByIdActionInterface,
    FetchTweetsByListIdActionInterface,
    ListActionType
} from "./contracts/actionTypes";
import {setList, setListLoadingState, setListsTweets} from './actionCreators';
import {LoadingStatus} from '../../types';
import {ListsApi} from "../../../services/api/listsApi";
import {BaseListResponse} from "../../types/lists";
import {TweetResponse} from "../../types/tweet";

export function* fetchListByIdRequest({payload}: FetchListByIdActionInterface) { // +
    try {
        yield put(setListLoadingState(LoadingStatus.LOADING));
        const data: BaseListResponse = yield call(ListsApi.getListById, payload);
        yield put(setList(data));
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTweetsByListIdRequest({payload}: FetchTweetsByListIdActionInterface) { // +
    try {
        yield put(setListLoadingState(LoadingStatus.LOADING));
        const data: TweetResponse[] = yield call(ListsApi.getTweetsByListId, payload.listId, payload.pageNumber);
        yield put(setListsTweets(data));
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* deleteListRequest({payload}: DeleteListActionInterface) { // +
    try {
        yield call(ListsApi.deleteList, payload);
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* editListRequest({payload}: EditListActionInterface) { // +
    try {
        yield put(setListLoadingState(LoadingStatus.LOADING));
        const data: BaseListResponse = yield call(ListsApi.editList, payload);
        yield put(setList(data));
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* listSaga() {
    yield takeEvery(ListActionType.FETCH_LIST_BY_ID, fetchListByIdRequest); // +
    yield takeEvery(ListActionType.FETCH_TWEETS_BY_LIST_ID, fetchTweetsByListIdRequest); // +
    yield takeEvery(ListActionType.DELETE_LIST, deleteListRequest); // +
    yield takeEvery(ListActionType.EDIT_LIST, editListRequest); // +
}
