import {call, put, takeLatest} from 'redux-saga/effects';

import {setTags, setTagsLoadingState, TagsActionsType} from './actionCreators';
import {TagsState} from './contracts/state';
import {TagsApi} from '../../../services/api/tagsApi'
import {LoadingStatus} from '../../types';

export function* fetchTagsRequest() {
    try {
        const items: TagsState['items'] = yield call(TagsApi.fetchTags);
        yield put(setTags(items));
    } catch (error) {
        yield put(setTagsLoadingState(LoadingStatus.ERROR));
    }
}

export function* tagsSaga() {
    yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
}
