import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {
    FetchChatParticipantActionInterface,
    FetchImagesActionInterface,
    FetchUserProfileActionInterface,
    ProcessSubscribeActionInterface,
    UserProfileActionsType,
} from "./contracts/actionTypes";
import {UserApi} from "../../../services/api/userApi";
import {
    setImages,
    setImagesLoadingStatus,
    setSubscribeToUserProfile,
    setUserProfile,
    setUserProfileLoadingState
} from "./actionCreators";
import {ChatApi} from "../../../services/api/chatApi";
import {UserProfileResponse} from "../../types/user";
import {TweetImageResponse} from "../../types/tweet";

export function* fetchUserRequest({payload}: FetchUserProfileActionInterface) {
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: UserProfileResponse = yield call(UserApi.getUserInfo, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* processSubscribeRequest({payload}: ProcessSubscribeActionInterface) {
    try {
        const item: boolean = yield call(UserApi.processSubscribeToNotifications, payload);
        yield put(setSubscribeToUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchChatParticipantRequest({payload}: FetchChatParticipantActionInterface) {
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: UserProfileResponse = yield call(ChatApi.getParticipant, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchImagesRequest({payload}: FetchImagesActionInterface) {
    try {
        yield put(setImagesLoadingStatus(LoadingStatus.LOADING));
        const items: TweetImageResponse[] = yield call(UserApi.getUserTweetImages, payload);
        yield put(setImages(items));
    } catch (error) {
        yield put(setImagesLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* userProfileSaga() {
    yield takeLatest(UserProfileActionsType.FETCH_USER, fetchUserRequest);
    yield takeLatest(UserProfileActionsType.PROCESS_SUBSCRIBE, processSubscribeRequest);
    yield takeLatest(UserProfileActionsType.FETCH_CHAT_PARTICIPANT, fetchChatParticipantRequest);
    yield takeLatest(UserProfileActionsType.FETCH_IMAGES, fetchImagesRequest);
}
