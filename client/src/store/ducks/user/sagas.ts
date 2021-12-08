import {call, put, takeLatest} from 'redux-saga/effects';
import {setUserData, setUserLoadingStatus} from "./actionCreators";
import {AuthUser, User} from "./contracts/state";
import {
    AddTweetToBookmarksActionInterface,
    AddUserToBlocklistActionInterface,
    AddUserToMuteListActionInterface,
    FetchPinTweetActionInterface,
    FetchReadMessagesActionInterface,
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FollowUserActionInterface,
    StartUseTwitterActionInterface,
    UnfollowUserActionInterface,
    UpdateBackgroundColorActionInterface,
    UpdateColorSchemeActionInterface,
    UpdateCountryActionInterface,
    UpdateDirectActionInterface,
    UpdateEmailActionInterface,
    UpdateGenderActionInterface,
    UpdateLanguageActionInterface,
    UpdatePhoneActionInterface,
    UpdatePrivateProfileActionInterface,
    UpdateUsernameActionInterface,
    UserActionsType
} from "./contracts/actionTypes";
import {AuthApi} from "../../../services/api/authApi";
import {UserApi} from "../../../services/api/userApi";
import {LoadingStatus} from "../../types";
import {ChatApi} from "../../../services/api/chatApi";
import {UserSettingsApi} from "../../../services/api/userSettingsApi";

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
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
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
        yield call(UserApi.follow, payload);
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

export function* fetchAddTweetToBookmarksRequest({payload}: AddTweetToBookmarksActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.addTweetToBookmarks, payload);
        yield put(setUserData(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchReadMessagesRequest({payload}: FetchReadMessagesActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(ChatApi.readChatMessages, payload);
        yield put(setUserData(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* addUserToBlocklistRequest({payload}: AddUserToBlocklistActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.processBlockList, payload);
        yield put(setUserData(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* addUserToMuteListRequest({payload}: AddUserToMuteListActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserApi.processMutedList, payload);
        yield put(setUserData(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateUsernameRequest({payload}: UpdateUsernameActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserSettingsApi.updateUsername, payload);
        yield put(setUserData(item));
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateEmailRequest({payload}: UpdateEmailActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: AuthUser = yield call(UserSettingsApi.updateEmail, payload);
        localStorage.setItem("token", item.token);
        yield put(setUserData(item.user));
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updatePhoneRequest({payload}: UpdatePhoneActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserSettingsApi.updatePhone, payload);
        yield put(setUserData(item));
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateCountryRequest({payload}: UpdateCountryActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserSettingsApi.updateCountry, payload);
        yield put(setUserData(item));
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateGenderRequest({payload}: UpdateGenderActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserSettingsApi.updateGender, payload);
        yield put(setUserData(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateLanguageRequest({payload}: UpdateLanguageActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserSettingsApi.updateLanguage, payload);
        yield put(setUserData(item));
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateDirectRequest({payload}: UpdateDirectActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserSettingsApi.updateDirectMessageRequests, payload);
        yield put(setUserData(item));
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updatePrivateProfileRequest({payload}: UpdatePrivateProfileActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserSettingsApi.updatePrivateProfile, payload);
        yield put(setUserData(item));
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateColorSchemeRequest({payload}: UpdateColorSchemeActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserSettingsApi.updateColorScheme, payload);
        yield put(setUserData(item));
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateBackgroundColorRequest({payload}: UpdateBackgroundColorActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: User = yield call(UserSettingsApi.updateBackgroundColor, payload);
        yield put(setUserData(item));
        yield put(setUserLoadingStatus(LoadingStatus.SUCCESS));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
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
    yield takeLatest(UserActionsType.ADD_TWEET_TO_BOOKMARKS, fetchAddTweetToBookmarksRequest);
    yield takeLatest(UserActionsType.FETCH_READ_MESSAGES, fetchReadMessagesRequest);
    yield takeLatest(UserActionsType.ADD_USER_TO_BLOCKLIST, addUserToBlocklistRequest);
    yield takeLatest(UserActionsType.ADD_USER_TO_MUTELIST, addUserToMuteListRequest);
    yield takeLatest(UserActionsType.UPDATE_USERNAME, updateUsernameRequest);
    yield takeLatest(UserActionsType.UPDATE_EMAIL, updateEmailRequest);
    yield takeLatest(UserActionsType.UPDATE_PHONE, updatePhoneRequest);
    yield takeLatest(UserActionsType.UPDATE_COUNTRY, updateCountryRequest);
    yield takeLatest(UserActionsType.UPDATE_GENDER, updateGenderRequest);
    yield takeLatest(UserActionsType.UPDATE_LANGUAGE, updateLanguageRequest);
    yield takeLatest(UserActionsType.UPDATE_DIRECT, updateDirectRequest);
    yield takeLatest(UserActionsType.UPDATE_PRIVATE_PROFILE, updatePrivateProfileRequest);
    yield takeLatest(UserActionsType.UPDATE_COLOR_SCHEME, updateColorSchemeRequest);
    yield takeLatest(UserActionsType.UPDATE_BACKGROUND_COLOR, updateBackgroundColorRequest);
}
