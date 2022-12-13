import {AxiosResponse} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";

import {
    FetchTopicsByCategoriesActionInterface,
    FetchTopicsByIdsActionInterface,
    TopicsActionsType
} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types/common";
import {
    setTopics,
    setTopicsByCategories,
    setTopicsByCategoriesLoadingState,
    setTopicsLoadingState
} from "./actionCreators";
import {TopicApi} from "../../../services/api/topicApi";
import {TopicResponse} from "../../types/topic";
import {TopicsByCategoriesResponse} from "./contracts/state";

export function* fetchTopicsByIdsRequest({payload}: FetchTopicsByIdsActionInterface) {
    try {
        yield put(setTopicsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TopicResponse[]> = yield call(TopicApi.getTopicsByIds, payload);
        yield put(setTopics(response.data));
    } catch (error) {
        yield put(setTopicsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTopicsByCategoriesRequest({payload}: FetchTopicsByCategoriesActionInterface) {
    try {
        yield put(setTopicsByCategoriesLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TopicsByCategoriesResponse[]> = yield call(TopicApi.getTopicsByCategories, payload);
        yield put(setTopicsByCategories(response.data));
    } catch (error) {
        yield put(setTopicsByCategoriesLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchNotInterestedTopicsRequest() {
    try {
        yield put(setTopicsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TopicResponse[]> = yield call(TopicApi.getNotInterestedTopics);
        yield put(setTopics(response.data));
    } catch (error) {
        yield put(setTopicsLoadingState(LoadingStatus.ERROR));
    }
}

export function* topicsSaga() {
    yield takeLatest(TopicsActionsType.FETCH_TOPICS_BY_IDS, fetchTopicsByIdsRequest);
    yield takeLatest(TopicsActionsType.FETCH_TOPICS_BY_CATEGORIES, fetchTopicsByCategoriesRequest);
    yield takeLatest(TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS, fetchNotInterestedTopicsRequest);
}
