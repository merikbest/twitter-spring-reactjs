import {call, put, takeLatest} from 'redux-saga/effects';
import {setUserData, setUserLoadingStatus} from "./actionCreators";
import {AuthUser, User} from "./contracts/state";
import {
    AddTweetToBookmarksActionInterface,
    FetchPinTweetActionInterface,
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FetchUnpinTweetActionInterface,
    FollowUserActionInterface,
    StartUseTwitterActionInterface,
    UnfollowUserActionInterface,
    UserActionsType
} from "./contracts/actionTypes";
import {AuthApi} from "../../../services/api/authApi";
import {UserApi} from "../../../services/api/userApi";
import {LoadingStatus} from "../../types";
import {setTweetsLoadingState} from "../tweets/actionCreators";
import {Tweet} from "../tweets/contracts/state";
import {TweetApi} from "../../../services/api/tweetApi";

export function* fetchSignInRequest({payload}: FetchSignInActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUser = yield call(AuthApi.signIn, payload);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data.user));
        payload.history.push("/home");
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSignUpRequest({payload}: FetchSignUpActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUser = yield call(AuthApi.endRegistration, payload);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data.user));
        payload.history.push({pathname: `/user/${data.user.id}`, state: {isRegistered: true}});
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserDataRequest() {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUser = yield call(AuthApi.getMe);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data.user));
    } catch (error) {
        console.log(error.response);
    }
}

export function* fetchFollowUserRequest({payload}: FollowUserActionInterface) {
    try {
        yield call(UserApi.follow, payload);
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUnfollowUserRequest({payload}: UnfollowUserActionInterface) {
    try {
        yield call(UserApi.unfollow, payload);
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchStartUseTwitter({payload}: StartUseTwitterActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.startUseTwitter, payload);
        yield put(setUserData(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchPinTweet({payload}: FetchPinTweetActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.pinTweet, payload);
        yield put(setUserData(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUnpinTweet({payload}: FetchUnpinTweetActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.unpinTweet, payload);
        yield put(setUserData(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchAddTweetToBookmarksRequest({payload}: AddTweetToBookmarksActionInterface) {
    try {
        yield put(setTweetsLoadingState(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.addTweetToBookmarks, payload);
        yield put(setUserData(item));
    } catch (e) {
        yield put(setTweetsLoadingState(LoadingStatus.ERROR));
    }
}

export function* userSaga() {
    yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
    yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
    yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
    yield takeLatest(UserActionsType.FOLLOW_USER, fetchFollowUserRequest);
    yield takeLatest(UserActionsType.UNFOLLOW_USER, fetchUnfollowUserRequest);
    yield takeLatest(UserActionsType.START_USE_TWITTER, fetchStartUseTwitter);
    yield takeLatest(UserActionsType.FETCH_PIN_TWEET, fetchPinTweet);
    yield takeLatest(UserActionsType.FETCH_UNPIN_TWEET, fetchUnpinTweet);
    yield takeLatest(UserActionsType.ADD_TWEET_TO_BOOKMARKS, fetchAddTweetToBookmarksRequest);
}
