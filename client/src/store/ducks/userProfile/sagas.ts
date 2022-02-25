import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {
    FetchChatParticipantActionInterface,
    FetchUserProfileActionInterface,
    ProcessFollowRequestActionInterface,
    ProcessSubscribeActionInterface,
    UserProfileActionsType,
} from "./contracts/actionTypes";
import {UserApi} from "../../../services/api/userApi";
import {setSubscribeToUserProfile, setUserProfile, setUserProfileLoadingState} from "./actionCreators";
import {setUserLoadingStatus} from "../user/actionCreators";
import {ChatApi} from "../../../services/api/chatApi";
import {UserProfileResponse} from "../../types/user";
import {setSubscribedUsersState} from "../users/actionCreators";

export function* fetchUserRequest({payload}: FetchUserProfileActionInterface) { // +
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: UserProfileResponse = yield call(UserApi.getUserInfo, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* processSubscribeRequest({payload}: ProcessSubscribeActionInterface) { // +
    try {
        const item: boolean = yield call(UserApi.processSubscribeToNotifications, payload);
        yield put(setSubscribeToUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* processFollowRequest({payload}: ProcessFollowRequestActionInterface) { // +
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: UserProfileResponse = yield call(UserApi.processFollowRequestToPrivateProfile, payload);
        yield put(setUserProfile(item));
        yield put(setSubscribedUsersState({userId: item.id, isSubscriber: item.isSubscriber}));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchChatParticipant({payload}: FetchChatParticipantActionInterface) { // +
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: UserProfileResponse = yield call(ChatApi.getParticipant, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* userProfileSaga() {
    yield takeLatest(UserProfileActionsType.FETCH_USER, fetchUserRequest); // +
    yield takeLatest(UserProfileActionsType.PROCESS_SUBSCRIBE, processSubscribeRequest); // +
    yield takeLatest(UserProfileActionsType.PROCESS_FOLLOW_REQUEST, processFollowRequest); // +
    yield takeLatest(UserProfileActionsType.FETCH_CHAT_PARTICIPANT, fetchChatParticipant); // +
}
