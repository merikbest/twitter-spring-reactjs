import {AxiosResponse} from "axios";
import {call, put, takeLatest} from 'redux-saga/effects';

import {setTags, setTagsLoadingState, setTrends, setTrendsLoadingState} from './actionCreators';
import {TagApi} from '../../../services/api/tagApi'
import {LoadingStatus} from '../../types';
import {FetchTrendsActionInterface, TagsActionsType} from "./contracts/actionTypes";
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

export function* fetchTrendsRequest({payload}: FetchTrendsActionInterface) {
    try {
        yield put(setTrendsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TagResponse[]> = yield call(TagApi.fetchTrends, payload);
        yield put(setTrends({
            items: response.data,
            pagesCount: parseInt(response.headers["page-total-count"])
        }));
    } catch (error) {
        yield put(setTrendsLoadingState(LoadingStatus.ERROR));
    }
}

export function* tagsSaga() {
    yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
    yield takeLatest(TagsActionsType.FETCH_TRENDS, fetchTrendsRequest);
}
