import {call, put, takeLatest} from 'redux-saga/effects';

import {setTags, setTagsLoadingState} from './actionCreators';
import {Tag} from './contracts/state';
import {TagApi} from '../../../services/api/tagApi'
import {LoadingStatus} from '../../types';
import {TagsActionsType} from "./contracts/actionTypes";

export function* fetchTagsRequest() {
    try {
        setTagsLoadingState(LoadingStatus.LOADING);
        const items: Tag[] = yield call(TagApi.fetchTags);
        yield put(setTags(items));
    } catch (error) {
        yield put(setTagsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTrendsRequest() {
    try {
        setTagsLoadingState(LoadingStatus.LOADING);
        const items: Tag[] = yield call(TagApi.fetchTrends);
        yield put(setTags(items));
    } catch (error) {
        yield put(setTagsLoadingState(LoadingStatus.ERROR));
    }
}

export function* tagsSaga() {
    yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
    yield takeLatest(TagsActionsType.FETCH_TRENDS, fetchTrendsRequest);
}
