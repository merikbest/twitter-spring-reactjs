import {call, put, takeLatest} from 'redux-saga/effects';

import {setTags, setTagsLoadingState} from './actionCreators';
import {Tag} from './contracts/state';
import {TagsApi} from '../../../services/api/tagsApi'
import {LoadingStatus} from '../../types';
import {TagsActionsType} from "./contracts/actionTypes";

export function* fetchTagsRequest() {
    try {
        setTagsLoadingState(LoadingStatus.LOADING);
        const items: Tag[] = yield call(TagsApi.fetchTags);
        yield put(setTags(items));
    } catch (error) {
        yield put(setTagsLoadingState(LoadingStatus.ERROR));
    }
}

export function* tagsSaga() {
    yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
}
