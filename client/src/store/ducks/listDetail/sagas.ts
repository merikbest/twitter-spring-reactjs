import {call, put, takeLatest} from 'redux-saga/effects';

import {setListDetail, setListDetailLoadingState} from './actionCreators';
import {LoadingStatus} from '../../types';
import {FetchListDetailActionInterface, ListDetailActionsType} from "./contracts/actionTypes";
import {ListsApi} from "../../../services/api/listsApi";
import {BaseListResponse} from "../../types/lists";

export function* fetchListDetailRequest({payload}: FetchListDetailActionInterface) {
    try {
        yield put(setListDetailLoadingState(LoadingStatus.LOADING));
        const item: BaseListResponse = yield call(ListsApi.getListDetails, payload.listId, payload.cancelTokenSource);
        yield put(setListDetail(item));
    } catch (error) {
        yield put(setListDetailLoadingState(LoadingStatus.ERROR));
    }
}

export function* listDetailSaga() {
    yield takeLatest(ListDetailActionsType.FETCH_LIST_DETAIL, fetchListDetailRequest);
}
