import { call, put, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";

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
import { UserApi } from "../../../services/api/user-service/userApi";
import { ChatMessageApi } from "../../../services/api/chat-service/chatMessageApi";
import { UserSettingsApi } from "../../../services/api/user-service/userSettingsApi";
import { AuthenticationResponse } from "../../../types/auth";
import { AuthUserResponse, UserProfileResponse } from "../../../types/user";
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
import { setBlockedToTweetState, setFollowToTweetState, setMutedToTweetState } from "../tweet/actionCreators";
import { setBlockedToTweetsState, setFollowToTweetsState, setMutedToTweetsState } from "../tweets/actionCreators";
import {
    setBlockUsersSearchState,
    setFollowRequestToUsersSearchState,
    setFollowToUsersSearchState
} from "../usersSearch/actionCreators";
import { setBlockUserDetail, setFollowRequestToUserDetail, setFollowToUserDetail } from "../userDetail/actionCreators";
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
import { setBlockedUser, setMutedUser } from "../blockedAndMutedUsers/actionCreators";
import { HOME, PROFILE } from "../../../constants/path-constants";
import { ChangePhoneResponse } from "./contracts/state";
import {
    setBlockedTweetAdditionalInfo,
    setFollowedTweetAdditionalInfo,
    setMutedTweetAdditionalInfo
} from "../tweetAdditionalInfo/actionCreators";
import { LoadingStatus } from "../../../types/common";
import { TOKEN } from "../../../constants/common-constants";
import { AuthenticationApi } from "../../../services/api/user-service/authenticationApi";
import { BlockUserApi } from "../../../services/api/user-service/blockUserApi";
import { FollowerUserApi } from "../../../services/api/user-service/followerUserApi";
import { MuteUserApi } from "../../../services/api/user-service/muteUserApi";
import { RegistrationApi } from "../../../services/api/user-service/registrationApi";

export function* updateUserDataRequest({ payload }: UpdateUserDataActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<AuthUserResponse> = yield call(UserApi.updateUserProfile, payload);
        yield put(setUserData(response.data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSignInRequest({ payload }: FetchSignInActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<AuthenticationResponse> = yield call(AuthenticationApi.login, payload);
        localStorage.setItem(TOKEN, response.data.token);
        yield put(setUserData(response.data.user));
        payload.history.push(HOME);
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchSignUpRequest({ payload }: FetchSignUpActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<AuthenticationResponse> = yield call(RegistrationApi.endRegistration, payload);
        localStorage.setItem(TOKEN, response.data.token);
        yield put(setUserData(response.data.user));
        payload.history.push({ pathname: `${PROFILE}/${response.data.user.id}`, state: { isRegistered: true } });
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchUserDataRequest() {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<AuthenticationResponse> = yield call(UserApi.getUserByToken);
        localStorage.setItem(TOKEN, response.data.token);
        yield put(setUserData(response.data.user));
    } catch (error) {
        if (localStorage.getItem(TOKEN) !== null) {
            yield put(setUserLoadingStatus(LoadingStatus.ERROR));
        }
    }
}

export function* processFollowUserRequest({ payload }: FollowUserActionInterface) {
    try {
        const { data }: AxiosResponse<boolean> = yield call(FollowerUserApi.processFollow, payload.userId);
        yield put(setFollowToTweetsState({ userId: payload.userId, tweetId: payload.tweetId!, isFollower: data }));
        yield put(setFollowToUsersTweetState({ userId: payload.userId, tweetId: payload.tweetId!, isFollower: data }));
        yield put(setUserFollowing(data));
        yield put(setFollowToUserProfile({ userId: payload.userId, isFollower: data }));
        yield put(setFollowToUserDetail(data));
        yield put(setFollowToUsersState({ userId: payload.userId, isFollower: data }));
        yield put(setFollowToUsersSearchState({ userId: payload.userId, isFollower: data }));
        yield put(setFollowToTweetState(data));
        yield put(setFollowToNotificationInfo(data));
        yield put(setFollowedTweetAdditionalInfo(data));
    } catch (error) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* startUseTwitterRequest() {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<boolean> = yield call(UserApi.startUseTwitter);
        yield put(setProfileStarted(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchPinTweetRequest({ payload }: FetchPinTweetActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<number> = yield call(UserApi.processPinTweet, payload);
        yield put(setPinTweetId(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* fetchReadMessagesRequest({ payload }: FetchReadMessagesActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: AxiosResponse<number> = yield call(ChatMessageApi.readChatMessages, payload);
        yield put(setReadMessage(item.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateUsernameRequest({ payload }: UpdateUsernameActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(UserSettingsApi.updateUsername, payload);
        yield put(setUsername(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateEmailRequest({ payload }: UpdateEmailActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const item: AuthenticationResponse = yield call(UserSettingsApi.updateEmail, payload);
        localStorage.setItem(TOKEN, item.token);
        yield put(setEmail(item.user.email));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updatePhoneRequest({ payload }: UpdatePhoneActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const { data }: AxiosResponse<ChangePhoneResponse> = yield call(UserSettingsApi.updatePhone, payload);
        yield put(setPhone(data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateCountryRequest({ payload }: UpdateCountryActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(UserSettingsApi.updateCountry, payload);
        yield put(setCountry(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateGenderRequest({ payload }: UpdateGenderActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(UserSettingsApi.updateGender, payload);
        yield put(setGender(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateLanguageRequest({ payload }: UpdateLanguageActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(UserSettingsApi.updateLanguage, payload);
        yield put(setLanguage(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateDirectRequest({ payload }: UpdateDirectActionInterface) {
    try {
        const response: AxiosResponse<boolean> = yield call(UserSettingsApi.updateDirectMessageRequests, payload);
        yield put(setDirect(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updatePrivateProfileRequest({ payload }: UpdatePrivateProfileActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<boolean> = yield call(UserSettingsApi.updatePrivateProfile, payload);
        yield put(setPrivateProfile(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateColorSchemeRequest({ payload }: UpdateColorSchemeActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(UserSettingsApi.updateColorScheme, payload);
        yield put(setColorScheme(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* updateBackgroundColorRequest({ payload }: UpdateBackgroundColorActionInterface) {
    try {
        yield put(setUserLoadingStatus(LoadingStatus.LOADING));
        const response: AxiosResponse<string> = yield call(UserSettingsApi.updateBackgroundColor, payload);
        yield put(setBackgroundColor(response.data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* processUserToBlocklistRequest({ payload }: ProcessUserToBlocklistActionInterface) {
    try {
        const { data }: AxiosResponse<boolean> = yield call(BlockUserApi.processBlockList, payload.userId);
        yield put(setBlockedToTweetsState({ userId: payload.userId, tweetId: payload.tweetId!, isUserBlocked: data }));
        yield put(setBlockedUsersTweetState({
            userId: payload.userId,
            tweetId: payload.tweetId!,
            isUserBlocked: data
        }));
        yield put(setBlocked(data));
        yield put(setBlockUserDetail(data));
        yield put(setBlockedUser({ userId: payload.userId, isUserBlocked: data }));
        yield put(setBlockedUsersState({ userId: payload.userId, isUserBlocked: data }));
        yield put(setBlockUsersSearchState({ userId: payload.userId, isUserBlocked: data }));
        yield put(setBlockedToTweetState(data));
        yield put(setBlockedNotificationInfo(data));
        yield put(setBlockedTweetAdditionalInfo(data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* processUserToMuteListRequest({ payload }: ProcessUserToMuteListActionInterface) {
    try {
        const { data }: AxiosResponse<boolean> = yield call(MuteUserApi.processMutedList, payload.userId);
        yield put(setMutedToTweetsState({ userId: payload.userId, tweetId: payload.tweetId!, isUserMuted: data }));
        yield put(setMutedUsersTweetState({ userId: payload.userId, tweetId: payload.tweetId!, isUserMuted: data }));
        yield put(setMuted(data));
        yield put(setMutedUser({ userId: payload.userId, isUserMuted: data }));
        yield put(setMutedUsersState({ userId: payload.userId, isUserMuted: data })); // TODO NOT NEEDED ???
        yield put(setMutedToTweetState(data));
        yield put(setMutedTweetAdditionalInfo(data));
    } catch (e) {
        yield put(setUserLoadingStatus(LoadingStatus.ERROR));
    }
}

export function* processFollowRequests({ payload }: ProcessFollowRequestActionInterface) {
    try {
        const { data }: AxiosResponse<UserProfileResponse> = yield call(FollowerUserApi.processFollowRequestToPrivateProfile, payload);
        yield put(setFollowRequestToUserProfile(data.isWaitingForApprove));
        yield put(setFollowRequestToUserDetail(data.isWaitingForApprove));
        yield put(setFollowRequestToUsers({ userId: data.id, isWaitingForApprove: data.isWaitingForApprove }));
        yield put(setFollowRequestToUsersSearchState({
            userId: data.id,
            isWaitingForApprove: data.isWaitingForApprove
        }));
        yield put(setFollowRequestToNotificationInfo(data.isWaitingForApprove));
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
