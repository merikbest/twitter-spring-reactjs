import {call, put, takeEvery} from 'redux-saga/effects';

import {
    DeleteListActionInterface,
    EditListActionInterface,
    FetchListByIdActionInterface,
    ListActionType
} from "./contracts/actionTypes";
import {setList, setListLoadingState} from './actionCreators';
import {LoadingStatus} from '../../types';
import {ListsApi} from "../../../services/api/listsApi";
import {Lists} from "../lists/contracts/state";

export function* fetchListByIdRequest({payload}: FetchListByIdActionInterface) {
    try {
        yield put(setListLoadingState(LoadingStatus.LOADING));
        const data: Lists = yield call(ListsApi.getListById, payload);
        yield put(setList(data));
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* deleteListRequest({payload}: DeleteListActionInterface) {
    try {
        yield call(ListsApi.deleteList, payload);
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* editListRequest({payload}: EditListActionInterface) {
    try {
        yield put(setListLoadingState(LoadingStatus.LOADING));
        const data: Lists = yield call(ListsApi.editList, payload);
        yield put(setList(data));
    } catch (error) {
        yield put(setListLoadingState(LoadingStatus.ERROR));
    }
}

export function* listSaga() {
    yield takeEvery(ListActionType.FETCH_LIST_BY_ID, fetchListByIdRequest);
    yield takeEvery(ListActionType.DELETE_LIST, deleteListRequest);
    yield takeEvery(ListActionType.EDIT_LIST, editListRequest);
}
