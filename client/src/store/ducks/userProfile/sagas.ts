import {call, put, takeLatest} from 'redux-saga/effects';

import {LoadingStatus} from '../../types';
import {
    AddUserToBlocklistActionInterface,
    AddUserToMuteListActionInterface,
    FetchChatParticipantActionInterface,
    FetchUserProfileActionInterface,
    // FollowUserProfileActionInterface,
    ProcessFollowRequestActionInterface,
    ProcessSubscribeActionInterface,
    // UnfollowUserProfileActionInterface,
    UserProfileActionsType,
} from "./contracts/actionTypes";
import {User} from "../user/contracts/state";
import {UserApi} from "../../../services/api/userApi";
import {setBlocked, setMuted, setUserProfile, setUserProfileLoadingState} from "./actionCreators";
import {setUserLoadingStatus} from "../user/actionCreators";
import {ChatApi} from "../../../services/api/chatApi";
import {UserProfileResponse} from "../../types/user";

export function* fetchUserRequest({payload}: FetchUserProfileActionInterface) { // +
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: UserProfileResponse = yield call(UserApi.getUserInfo, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

// export function* followUserRequest({payload}: FollowUserProfileActionInterface) {
//     try {
//         const item: User = yield call(UserApi.follow, payload);
//         yield put(setUserProfile(item));
//     } catch (error) {
//         yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
//     }
// }
//
// export function* unfollowUseRequest({payload}: UnfollowUserProfileActionInterface) {
//     try {
//         const item: User = yield call(UserApi.follow, payload);
//         yield put(setUserProfile(item));
//     } catch (error) {
//         yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
//     }
// }

export function* processSubscribeRequest({payload}: ProcessSubscribeActionInterface) {
    try {
        const item: User = yield call(UserApi.processSubscribeToNotifications, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* processFollowRequest({payload}: ProcessFollowRequestActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.processFollowRequestToPrivateProfile, payload);
        yield put(setUserProfile(item));
        // yield put(setUpdatedUsers(item));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchChatParticipant({payload}: FetchChatParticipantActionInterface) {
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: User = yield call(ChatApi.getParticipant, payload);
        yield put(setUserProfile(item));
    } catch (error) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* addUserToBlocklistRequest({payload}: AddUserToBlocklistActionInterface) { // + REFACTOR
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: boolean = yield call(UserApi.processBlockList, payload);
        yield put(setBlocked(item));
        // set to users payload: { userId: number; isUserBlocked: boolean };
    } catch (e) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* addUserToMuteListRequest({payload}: AddUserToMuteListActionInterface) { // + REFACTOR
    try {
        yield put(setUserProfileLoadingState(LoadingStatus.LOADING));
        const item: boolean = yield call(UserApi.processMutedList, payload);
        yield put(setMuted(item));
        // set to users payload: { userId: number; isUserBlocked: boolean };
    } catch (e) {
        yield put(setUserProfileLoadingState(LoadingStatus.ERROR));
    }
}

export function* userProfileSaga() {
    yield takeLatest(UserProfileActionsType.FETCH_USER, fetchUserRequest); // +
    // yield takeLatest(UserProfileActionsType.FOLLOW_USER, followUserRequest);
    // yield takeLatest(UserProfileActionsType.UNFOLLOW_USER, unfollowUseRequest);
    yield takeLatest(UserProfileActionsType.PROCESS_SUBSCRIBE, processSubscribeRequest);
    yield takeLatest(UserProfileActionsType.PROCESS_FOLLOW_REQUEST, processFollowRequest);
    yield takeLatest(UserProfileActionsType.FETCH_CHAT_PARTICIPANT, fetchChatParticipant);

    yield takeLatest(UserProfileActionsType.ADD_USER_TO_BLOCKLIST, addUserToBlocklistRequest); // + REFACTOR
    yield takeLatest(UserProfileActionsType.ADD_USER_TO_MUTELIST, addUserToMuteListRequest); // + REFACTOR
}
