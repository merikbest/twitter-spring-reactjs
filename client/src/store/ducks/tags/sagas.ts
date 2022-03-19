import {call, put, takeLatest} from 'redux-saga/effects';

import {setTags, setTagsLoadingState} from './actionCreators';
import {TagApi} from '../../../services/api/tagApi'
import {LoadingStatus} from '../../types';
import {TagsActionsType} from "./contracts/actionTypes";
import {TagResponse} from "../../types/tag";

export function* fetchTagsRequest() {
    try {
        yield put(setTagsLoadingState(LoadingStatus.LOADING));
        const items: TagResponse[] = yield call(TagApi.fetchTags);
        yield put(setTags(items));
    } catch (error) {
        yield put(setTagsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTrendsRequest() {
    try {
        yield put(setTagsLoadingState(LoadingStatus.LOADING));
        const items: TagResponse[] = yield call(TagApi.fetchTrends);
        yield put(setTags(items));
    } catch (error) {
        yield put(setTagsLoadingState(LoadingStatus.ERROR));
    }
}

export function* tagsSaga() {
    yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
    yield takeLatest(TagsActionsType.FETCH_TRENDS, fetchTrendsRequest);
}
