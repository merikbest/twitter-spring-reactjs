import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import {
    FetchFollowedTopicsByUserIdActionInterface,
    FetchTopicsByCategoriesActionInterface,
    FetchTopicsByIdsActionInterface,
    ProcessFollowTopicActionInterface,
    ProcessNotInterestedTopicActionInterface,
    TopicsActionsType
} from "./contracts/actionTypes";
import { LoadingStatus } from "../../../types/common";
import {
    setFollowedTopics,
    setFollowedTopicsLoadingState,
    setFollowTopic,
    setNotInterestedTopic,
    setTopics,
    setTopicsByCategories,
    setTopicsByCategoriesLoadingState,
    setTopicsLoadingState
} from "./actionCreators";
import { TopicApi } from "../../../services/api/topic-service/topicApi";
import { TopicResponse } from "../../../types/topic";
import { TopicsByCategoriesResponse } from "./contracts/state";

export function* fetchTopicsByIdsRequest({ payload }: FetchTopicsByIdsActionInterface) {
    try {
        yield put(setTopicsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TopicResponse[]> = yield call(TopicApi.getTopicsByIds, payload);
        yield put(setTopics(response.data));
    } catch (error) {
        yield put(setTopicsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchTopicsByCategoriesRequest({ payload }: FetchTopicsByCategoriesActionInterface) {
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

export function* fetchFollowedTopicsRequest() {
    try {
        yield put(setFollowedTopicsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TopicResponse[]> = yield call(TopicApi.getFollowedTopics);
        yield put(setFollowedTopics(response.data));
    } catch (error) {
        yield put(setFollowedTopicsLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchFollowedTopicsByUserIdRequest({ payload }: FetchFollowedTopicsByUserIdActionInterface) {
    try {
        yield put(setFollowedTopicsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TopicResponse[]> = yield call(TopicApi.getFollowedTopicsByUserId, payload);
        yield put(setFollowedTopics(response.data));
    } catch (error) {
        yield put(setFollowedTopicsLoadingState(LoadingStatus.ERROR));
    }
}

export function* processNotInterestedTopicRequest({ payload }: ProcessNotInterestedTopicActionInterface) {
    try {
        const response: AxiosResponse<boolean> = yield call(TopicApi.processNotInterestedTopic, payload);
        yield put(setNotInterestedTopic({ topicsId: payload, isTopicNotInterested: response.data }));
    } catch (error) {
        yield put(setTopicsLoadingState(LoadingStatus.ERROR));
    }
}

export function* processFollowTopicRequest({ payload }: ProcessFollowTopicActionInterface) {
    try {
        const response: AxiosResponse<boolean> = yield call(TopicApi.processFollowTopic, payload.topicsId);
        yield put(setFollowTopic({
            topicsId: payload.topicsId,
            topicCategory: payload.topicCategory,
            isTopicFollowed: response.data
        }));
    } catch (error) {
        yield put(setTopicsLoadingState(LoadingStatus.ERROR));
    }
}

export function* topicsSaga() {
    yield takeLatest(TopicsActionsType.FETCH_TOPICS_BY_IDS, fetchTopicsByIdsRequest);
    yield takeLatest(TopicsActionsType.FETCH_TOPICS_BY_CATEGORIES, fetchTopicsByCategoriesRequest);
    yield takeLatest(TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS, fetchNotInterestedTopicsRequest);
    yield takeLatest(TopicsActionsType.FETCH_FOLLOWED_TOPICS, fetchFollowedTopicsRequest);
    yield takeLatest(TopicsActionsType.FETCH_FOLLOWED_TOPICS_BY_USER_ID, fetchFollowedTopicsByUserIdRequest);
    yield takeLatest(TopicsActionsType.PROCESS_NOT_INTERESTED_TOPIC, processNotInterestedTopicRequest);
    yield takeLatest(TopicsActionsType.PROCESS_FOLLOW_TOPIC, processFollowTopicRequest);
}
