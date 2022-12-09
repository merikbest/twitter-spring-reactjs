import {AxiosResponse} from "axios";
import {call, put, takeLatest} from "redux-saga/effects";

import {TopicsActionsType} from "./contracts/actionTypes";
import {LoadingStatus} from "../../types/common";
import {setTopics, setTopicsLoadingState} from "./actionCreators";
import {TopicApi} from "../../../services/api/topicApi";
import {TopicResponse} from "../../types/topic";

export function* fetchTopicsRequest() {
    try {
        yield put(setTopicsLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<TopicResponse[]> = yield call(TopicApi.getTopics);
        yield put(setTopics(response.data));
    } catch (error) {
        yield put(setTopicsLoadingState(LoadingStatus.ERROR));
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
    yield takeLatest(TopicsActionsType.FETCH_TOPICS, fetchTopicsRequest);
    yield takeLatest(TopicsActionsType.FETCH_NOT_INTERESTED_TOPICS, fetchNotInterestedTopicsRequest);
}
