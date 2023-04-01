import { AxiosResponse } from "axios";
import { call, put, takeLatest } from "redux-saga/effects";

import {
    FetchChatParticipantActionInterface,
    FetchImagesActionInterface,
    FetchUserProfileActionInterface,
    ProcessSubscribeActionInterface,
    UserProfileActionsType
} from "./contracts/actionTypes";
import { UserApi } from "../../../services/api/user-service/userApi";
import {
    setImages,
    setImagesLoadingStatus,
    setSubscribeToUserProfile,
    setUserProfile,
    setUserProfileLoadingState
} from "./actionCreators";
import { ChatParticipantApi } from "../../../services/api/chat-service/chatParticipantApi";
import { UserProfileResponse } from "../../../types/user";
import { TweetImageResponse } from "../../../types/tweet";
import { LoadingStatus } from "../../../types/common";
import { TweetApi } from "../../../services/api/tweet-service/tweetApi";

export function* fetchUserRequest({ payload }: FetchUserProfileActionInterface) {
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserProfileResponse> = yield call(UserApi.getUserById, payload);
        yield put(setUserProfile(response.data));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* processSubscribeRequest({ payload }: ProcessSubscribeActionInterface) {
    try {
        const response: AxiosResponse<boolean> = yield call(UserApi.processSubscribeToNotifications, payload);
        yield put(setSubscribeToUserProfile(response.data));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchChatParticipantRequest({ payload }: FetchChatParticipantActionInterface) {
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const response: AxiosResponse<UserProfileResponse> = yield call(ChatParticipantApi.getParticipant, payload);
        yield put(setUserProfile(response.data));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* fetchImagesRequest({ payload }: FetchImagesActionInterface) {
    try {
        yield put(setImagesLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<TweetImageResponse[]> = yield call(TweetApi.getUserTweetImages, payload);
        yield put(setImages(response.data));
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
