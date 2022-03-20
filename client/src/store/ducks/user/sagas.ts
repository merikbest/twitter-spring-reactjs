import {call, put, takeLatest} from 'redux-saga/effects';
import {
    setBackgroundColor,
    setColorScheme,
    setCountry,
    setDirect,
    setEmail,
    setGender,
    setLanguage,
    setPhone,
    setPinTweetId,
    setPrivateProfile,
    setProfileStarted,
    setReadMessage,
    setUserData,
    setUserFollowing,
    setUserLoadingStatus,
    setUsername
} from "./actionCreators";
import {
    FetchPinTweetActionInterface,
    FetchReadMessagesActionInterface,
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FollowUserActionInterface,
    ProcessFollowRequestActionInterface,
    ProcessUserToBlocklistActionInterface,
    ProcessUserToMuteListActionInterface,
    StartUseTwitterActionInterface,
    UpdateBackgroundColorActionInterface,
    UpdateColorSchemeActionInterface,
    UpdateCountryActionInterface,
    UpdateDirectActionInterface,
    UpdateEmailActionInterface,
    UpdateGenderActionInterface,
    UpdateLanguageActionInterface,
    UpdatePhoneActionInterface,
    UpdatePrivateProfileActionInterface,
    UpdateUserDataActionInterface,
    UpdateUsernameActionInterface,
    UserActionsType
} from "./contracts/actionTypes";
import {AuthApi} from "../../../services/api/authApi";
import {UserApi} from "../../../services/api/userApi";
import {LoadingStatus} from "../../types";
import {ChatApi} from "../../../services/api/chatApi";
import {UserSettingsApi} from "../../../services/api/userSettingsApi";
import {AuthenticationResponse} from "../../types/auth";
import {AuthUserResponse, UserProfileResponse} from "../../types/user";
import {
    setBlocked,
    setFollowRequestToUserProfile,
    setFollowToUserProfile,
    setMuted
} from "../userProfile/actionCreators";
import {
    setBlockedUsersState,
    setFollowRequestToUsers,
    setFollowToUsersState,
    setMutedUsersState
} from "../users/actionCreators";
import {setBlockedToTweetState, setFollowToTweetState, setMutedToTweetState} from "../tweet/actionCreators";
import {NotificationUserResponse} from "../../types/notification";
import {setBlockedToTweetsState, setFollowToTweetsState, setMutedToTweetsState} from "../tweets/actionCreators";
import {
    setBlockUsersSearchState,
    setFollowRequestToUsersSearchState,
    setFollowToUsersSearchState
} from "../usersSearch/actionCreators";
import {setBlockUserDetail, setFollowRequestToUserDetail, setFollowToUserDetail} from "../userDetail/actionCreators";
import {
    setBlockedUsersTweetState,
    setFollowToUsersTweetState,
    setMutedUsersTweetState
} from "../userTweets/actionCreators";
import {
    setBlockedNotificationInfo,
    setFollowRequestToNotificationInfo,
    setFollowToNotificationInfo
} from "../notifications/actionCreators";
import {setBlockedUser, setMutedUser} from "../blockedAndMutedUsers/actionCreators";

export function* updateUserDataRequest({payload}: UpdateUserDataActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthUserResponse = yield call(UserApi.updateUserProfile, payload);
        yield put(setUserData(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSignInRequest({payload}: FetchSignInActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthenticationResponse = yield call(AuthApi.signIn, payload);
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
        const data: AuthenticationResponse = yield call(AuthApi.endRegistration, payload);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data.user));
        payload.history.push({pathname: `/profile/${data.user.id}`, state: {isRegistered: true}});
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserDataRequest() {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const data: AuthenticationResponse = yield call(AuthApi.getMe);
        localStorage.setItem("token", data.token);
        yield put(setUserData(data.user));
    } catch (error) {
        if (localStorage.getItem('token') !== null) {
            yield put(setUserLoadingStatus(LoadingStatus.ERROR));
        }
    }
}

export function* processFollowUserRequest({payload}: FollowUserActionInterface) {
    try {
        const item: NotificationUserResponse = yield call(UserApi.follow, payload.userId);
        yield put(setFollowToTweetsState({userId: item.id, tweetId: payload.tweetId!, isFollower: item.isFollower}));
        yield put(setFollowToUsersTweetState({userId: item.id, tweetId: payload.tweetId!, isFollower: item.isFollower}));
        yield put(setUserFollowing(item.isFollower));
        yield put(setFollowToUserProfile(item.isFollower));
        yield put(setFollowToUserDetail(item.isFollower));
        yield put(setFollowToUsersState({userId: item.id, isFollower: item.isFollower}));
        yield put(setFollowToUsersSearchState({userId: item.id, isFollower: item.isFollower}));
        yield put(setFollowToTweetState(item.isFollower));
        yield put(setFollowToNotificationInfo(item.isFollower));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* startUseTwitterRequest({payload}: StartUseTwitterActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: boolean = yield call(UserApi.startUseTwitter, payload);
        yield put(setProfileStarted(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchPinTweetRequest({payload}: FetchPinTweetActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: number = yield call(UserApi.pinTweet, payload);
        yield put(setPinTweetId(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchReadMessagesRequest({payload}: FetchReadMessagesActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: number = yield call(ChatApi.readChatMessages, payload);
        yield put(setReadMessage(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateUsernameRequest({payload}: UpdateUsernameActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateUsername, payload);
        yield put(setUsername(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateEmailRequest({payload}: UpdateEmailActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: AuthenticationResponse = yield call(UserSettingsApi.updateEmail, payload);
        localStorage.setItem("token", item.token);
        yield put(setEmail(item.user.email));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updatePhoneRequest({payload}: UpdatePhoneActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: { countryCode: string; phone: number } = yield call(UserSettingsApi.updatePhone, payload);
        yield put(setPhone({countryCode: item.countryCode, phone: item.phone}));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateCountryRequest({payload}: UpdateCountryActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateCountry, payload);
        yield put(setCountry(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateGenderRequest({payload}: UpdateGenderActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateGender, payload);
        yield put(setGender(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateLanguageRequest({payload}: UpdateLanguageActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateLanguage, payload);
        yield put(setLanguage(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateDirectRequest({payload}: UpdateDirectActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: boolean = yield call(UserSettingsApi.updateDirectMessageRequests, payload);
        yield put(setDirect(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updatePrivateProfileRequest({payload}: UpdatePrivateProfileActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: boolean = yield call(UserSettingsApi.updatePrivateProfile, payload);
        yield put(setPrivateProfile(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateColorSchemeRequest({payload}: UpdateColorSchemeActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateColorScheme, payload);
        yield put(setColorScheme(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateBackgroundColorRequest({payload}: UpdateBackgroundColorActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: string = yield call(UserSettingsApi.updateBackgroundColor, payload);
        yield put(setBackgroundColor(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* processUserToBlocklistRequest({payload}: ProcessUserToBlocklistActionInterface) {
    try {
        const item: boolean = yield call(UserApi.processBlockList, payload.userId);
        yield put(setBlockedToTweetsState({userId: payload.userId, tweetId: payload.tweetId!, isUserBlocked: item}));
        yield put(setBlockedUsersTweetState({userId: payload.userId, tweetId: payload.tweetId!, isUserBlocked: item}));
        yield put(setBlocked(item));
        yield put(setBlockUserDetail(item));
        yield put(setBlockedUser({userId: payload.userId, isUserBlocked: item}));
        yield put(setBlockedUsersState({userId: payload.userId, isUserBlocked: item}));
        yield put(setBlockUsersSearchState({userId: payload.userId, isUserBlocked: item}));
        yield put(setBlockedToTweetState(item));
        yield put(setBlockedNotificationInfo(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* processUserToMuteListRequest({payload}: ProcessUserToMuteListActionInterface) {
    try {
        const item: boolean = yield call(UserApi.processMutedList, payload.userId);
        yield put(setMutedToTweetsState({userId: payload.userId, tweetId: payload.tweetId!, isUserMuted: item}));
        yield put(setMutedUsersTweetState({userId: payload.userId, tweetId: payload.tweetId!, isUserMuted: item}));
        yield put(setMuted(item));
        yield put(setMutedUser({userId: payload.userId, isUserMuted: item}));
        yield put(setMutedUsersState({userId: payload.userId, isUserMuted: item})); // TODO NOT NEEDED ???
        yield put(setMutedToTweetState(item));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* processFollowRequests({payload}: ProcessFollowRequestActionInterface) {
    try {
        const item: UserProfileResponse = yield call(UserApi.processFollowRequestToPrivateProfile, payload);
        yield put(setFollowRequestToUserProfile(item.isWaitingForApprove));
        yield put(setFollowRequestToUserDetail(item.isWaitingForApprove));
        yield put(setFollowRequestToUsers({userId: item.id, isWaitingForApprove: item.isWaitingForApprove}));
        yield put(setFollowRequestToUsersSearchState({userId: item.id, isWaitingForApprove: item.isWaitingForApprove}));
        yield put(setFollowRequestToNotificationInfo(item.isWaitingForApprove));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* userSaga() {
    yield takeLatest(UserActionsType.UPDATE_USER_DATA, updateUserDataRequest);
    yield takeLatest(UserActionsType.FETCH_SIGN_IN, fetchSignInRequest);
    yield takeLatest(UserActionsType.FETCH_SIGN_UP, fetchSignUpRequest);
    yield takeLatest(UserActionsType.FETCH_USER_DATA, fetchUserDataRequest);
    yield takeLatest(UserActionsType.FOLLOW_USER, processFollowUserRequest);
    yield takeLatest(UserActionsType.UNFOLLOW_USER, processFollowUserRequest);
    yield takeLatest(UserActionsType.START_USE_TWITTER, startUseTwitterRequest);
    yield takeLatest(UserActionsType.FETCH_PIN_TWEET, fetchPinTweetRequest);
    yield takeLatest(UserActionsType.FETCH_READ_MESSAGES, fetchReadMessagesRequest);
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
    yield takeLatest(UserActionsType.PROCESS_USER_TO_BLOCKLIST, processUserToBlocklistRequest);
    yield takeLatest(UserActionsType.PROCESS_USER_TO_MUTELIST, processUserToMuteListRequest);
    yield takeLatest(UserActionsType.PROCESS_FOLLOW_REQUEST, processFollowRequests);
}
