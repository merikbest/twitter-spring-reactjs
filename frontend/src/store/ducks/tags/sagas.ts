import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import { setTags, setTagsLoadingState, setTrends, setTrendsLoadingState } from "./actionCreators";
import { TagApi } from "../../../services/api/tag-service/tagApi";
import { FetchTrendsActionInterface, TagsActionsType } from "./contracts/actionTypes";
import { TagResponse } from "../../../types/tag";
import { LoadingStatus } from "../../../types/common";
import { PAGE_TOTAL_COUNT } from "../../../constants/common-constants";

export function* fetchTagsRequest() {
    try {
        yield put(setTagsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TagResponse[]> = yield call(TagApi.getTags);
        yield put(setTags(response.data));
    } catch (error) {
        yield put(setTagsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTrendsRequest({ payload }: FetchTrendsActionInterface) {
    try {
        yield put(setTrendsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TagResponse[]> = yield call(TagApi.getTrends, payload);
        yield put(setTrends({
            items: response.data,
            pagesCount: parseInt(response.headers[PAGE_TOTAL_COUNT])
        }));
    } catch (error) {
        yield put(setTrendsLoadingState(LoadingStatus.ERROR));
    }
}

export function* tagsSaga() {
    yield takeLatest(TagsActionsType.FETCH_TAGS, fetchTagsRequest);
    yield takeLatest(TagsActionsType.FETCH_TRENDS, fetchTrendsRequest);
}
