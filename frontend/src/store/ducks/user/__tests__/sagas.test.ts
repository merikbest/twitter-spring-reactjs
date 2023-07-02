import { AxiosResponse } from "axios";

import {
    fetchPinTweetRequest,
    fetchReadMessagesRequest,
    fetchSignInRequest,
    fetchSignUpRequest,
    fetchUserDataRequest,
    processFollowRequests,
    processFollowUserRequest,
    processUserToBlocklistRequest,
    processUserToMuteListRequest,
    startUseTwitterRequest,
    updateBackgroundColorRequest,
    updateColorSchemeRequest,
    updateCountryRequest,
    updateDirectRequest,
    updateEmailRequest,
    updateGenderRequest,
    updateLanguageRequest,
    updatePhoneRequest,
    updatePrivateProfileRequest,
    updateUserDataRequest,
    updateUsernameRequest,
    userSaga
} from "../sagas";
import {
    fetchPinTweet,
    fetchReadMessages,
    fetchSignIn,
    fetchSignUp,
    followUser,
    processFollowRequest,
    processUserToBlocklist,
    processUserToMuteList,
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
    setUsername,
    startUseTwitter,
    updateBackgroundColor,
    updateColorScheme,
    updateCountry,
    updateDirect,
    updatedUserData,
    updateEmail,
    updateGender,
    updateLanguage,
    updatePhone,
    updatePrivateProfile,
    updateUsername
} from "../actionCreators";

import { testCall, testLoadingStatus, testSetResponse, testWatchSaga } from "../../../../util/test-utils/test-helper";
import { UserApi } from "../../../../services/api/user-service/userApi";
import { AuthUserResponse, UserProfileResponse } from "../../../../types/user";
import { SettingsRequest, UserRequest } from "../contracts/state";
import { AuthenticationResponse, LoginRequest } from "../../../../types/auth";
import { EndRegistrationRequest } from "../../../../pages/Authentication/SetPasswordModal/SetPasswordModal";
import { NotificationUserResponse } from "../../../../types/notification";
import { setBlockedToTweetsState, setFollowToTweetsState, setMutedToTweetsState } from "../../tweets/actionCreators";
import {
    setBlockedUsersTweetState,
    setFollowToUsersTweetState,
    setMutedUsersTweetState
} from "../../userTweets/actionCreators";
import {
    setBlocked,
    setFollowRequestToUserProfile,
    setFollowToUserProfile,
    setMuted
} from "../../userProfile/actionCreators";
import {
    setBlockUserDetail,
    setFollowRequestToUserDetail,
    setFollowToUserDetail
} from "../../userDetail/actionCreators";
import {
    setBlockedUsersState,
    setFollowRequestToUsers,
    setFollowToUsersState,
    setMutedUsersState
} from "../../users/actionCreators";
import {
    setBlockUsersSearchState,
    setFollowRequestToUsersSearchState,
    setFollowToUsersSearchState
} from "../../usersSearch/actionCreators";
import { setBlockedToTweetState, setFollowToTweetState, setMutedToTweetState } from "../../tweet/actionCreators";
import {
    setBlockedNotificationInfo,
    setFollowRequestToNotificationInfo,
    setFollowToNotificationInfo
} from "../../notifications/actionCreators";
import { ChatMessageApi } from "../../../../services/api/chat-service/chatMessageApi";
import { UserSettingsApi } from "../../../../services/api/user-service/userSettingsApi";
import { setBlockedUser, setMutedUser } from "../../blockedAndMutedUsers/actionCreators";
import { UserActionsType } from "../contracts/actionTypes";
import { BackgroundTheme, ColorScheme, LoadingStatus } from "../../../../types/common";
import { AuthenticationApi } from "../../../../services/api/user-service/authenticationApi";
import { BlockUserApi } from "../../../../services/api/user-service/blockUserApi";
import { FollowerUserApi } from "../../../../services/api/user-service/followerUserApi";
import { MuteUserApi } from "../../../../services/api/user-service/muteUserApi";
import { RegistrationApi } from "../../../../services/api/user-service/registrationApi";

describe("userSaga:", () => {
    const mockAuthUser = { id: 1, email: "test@test.test" } as AuthUserResponse;
    const mockAuthentication = { user: mockAuthUser, token: "test" } as AuthenticationResponse;
    const mockAxiosAuthentication = {
        data: {
            user: mockAuthUser,
            token: "test"
        }
    } as AxiosResponse<AuthenticationResponse>;

    describe("updateUserDataRequest:", () => {
        const mockUserRequest = { fullName: "test", location: "test" } as UserRequest;
        const worker = updateUserDataRequest(updatedUserData(mockUserRequest));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.updateUserProfile, mockUserRequest);
        testSetResponse(worker, mockAxiosAuthentication, setUserData, mockAuthentication, "AuthUserResponse");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("fetchSignInRequest:", () => {
        const mockLoginProps = { email: "test@test.test", password: "test" } as LoginRequest;
        const worker = fetchSignInRequest(fetchSignIn(mockLoginProps));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, AuthenticationApi.login, mockLoginProps);
        testSetResponse(worker, mockAxiosAuthentication, setUserData, mockAuthUser, "AuthenticationResponse");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("fetchSignUpRequest:", () => {
        const mockRegistrationProps = { email: "test@test.test", password: "test" } as EndRegistrationRequest;
        const worker = fetchSignUpRequest(fetchSignUp(mockRegistrationProps));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, RegistrationApi.endRegistration, mockRegistrationProps);
        testSetResponse(worker, mockAxiosAuthentication, setUserData, mockAuthUser, "AuthenticationResponse");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("fetchUserDataRequest:", () => {
        const worker = fetchUserDataRequest();

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.getUserByToken);
        testSetResponse(worker, mockAxiosAuthentication, setUserData, mockAuthUser, "AuthenticationResponse");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("processFollowUserRequest:", () => {
        const mockNotificationUserResponse = { data: true } as AxiosResponse<boolean>;
        const mockPayload = { userId: 1, tweetId: 1, isFollower: true };
        const worker = processFollowUserRequest(followUser({ userId: 1, tweetId: 1 }));

        testCall(worker, FollowerUserApi.processFollow, 1);
        testSetResponse(worker, mockNotificationUserResponse, setFollowToTweetsState, mockPayload, "NotificationUserResponse");
        testSetResponse(worker, mockNotificationUserResponse, setFollowToUsersTweetState, mockPayload, "NotificationUserResponse");
        testSetResponse(worker, mockNotificationUserResponse, setUserFollowing, true, "NotificationUserResponse");
        testSetResponse(worker, mockNotificationUserResponse, setFollowToUserProfile, { userId: 1, isFollower: true }, "NotificationUserResponse");
        testSetResponse(worker, mockNotificationUserResponse, setFollowToUserDetail, true, "NotificationUserResponse");
        testSetResponse(worker, mockNotificationUserResponse, setFollowToUsersState, {
            userId: 1,
            isFollower: true
        }, "NotificationUserResponse");
        testSetResponse(worker, mockNotificationUserResponse, setFollowToUsersSearchState, {
            userId: 1,
            isFollower: true
        }, "NotificationUserResponse");
        testSetResponse(worker, mockNotificationUserResponse, setFollowToTweetState, true, "NotificationUserResponse");
        testSetResponse(worker, mockNotificationUserResponse, setFollowToNotificationInfo, true, "NotificationUserResponse");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("startUseTwitterRequest:", () => {
        const worker = startUseTwitterRequest();

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.startUseTwitter);
        testSetResponse(worker, { data: true }, setProfileStarted, true, "boolean");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("fetchPinTweetRequest:", () => {
        const worker = fetchPinTweetRequest(fetchPinTweet(1));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserApi.processPinTweet, 1, 1);
        testSetResponse(worker, { data: 1 }, setPinTweetId, 1, "number");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("fetchReadMessagesRequest:", () => {
        const mockResponse = { data: 1 } as AxiosResponse<number>;
        const worker = fetchReadMessagesRequest(fetchReadMessages(1));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, ChatMessageApi.readChatMessages, 1, 1);
        testSetResponse(worker, mockResponse, setReadMessage, mockResponse.data, "number");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updateUsernameRequest:", () => {
        const worker = updateUsernameRequest(updateUsername({ username: "test" }));
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserSettingsApi.updateUsername, { username: "test" }, "test");
        testSetResponse(worker, { data: "test" }, setUsername, "test", "string");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updateEmailRequest:", () => {
        const worker = updateEmailRequest(updateEmail({ email: "test@test.test" }));

        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserSettingsApi.updateEmail, { email: "test@test.test" }, "test@test.test");
        testSetResponse(worker, mockAuthentication, setEmail, "test@test.test", "string");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updatePhoneRequest:", () => {
        const mockPhoneSettings = { countryCode: "US", phone: 12345 };
        const mockResponse = { data: mockPhoneSettings } as AxiosResponse<any>;
        const worker = updatePhoneRequest(updatePhone(mockPhoneSettings));
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserSettingsApi.updatePhone, mockPhoneSettings, mockPhoneSettings);
        testSetResponse(worker, mockResponse, setPhone, mockPhoneSettings, "string");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updateCountryRequest:", () => {
        const worker = updateCountryRequest(updateCountry({ country: "test" }));
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserSettingsApi.updateCountry, { country: "test" }, "test");
        testSetResponse(worker, { data: "test" }, setCountry, "test", "string");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updateGenderRequest:", () => {
        const worker = updateGenderRequest(updateGender({ updateGender: "testGender" } as SettingsRequest));
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserSettingsApi.updateGender, { updateGender: "testGender" }, "testGender");
        testSetResponse(worker, { data: "testGender" }, setGender, "testGender", "string");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updateLanguageRequest:", () => {
        const worker = updateLanguageRequest(updateLanguage({ language: "english" }));
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserSettingsApi.updateLanguage, { language: "english" }, "english");
        testSetResponse(worker, { data: "english" }, setLanguage, "english", "string");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updateDirectRequest:", () => {
        const worker = updateDirectRequest(updateDirect({ mutedDirectMessages: true }));
        testCall(worker, UserSettingsApi.updateDirectMessageRequests, { mutedDirectMessages: true }, true);
        testSetResponse(worker, { data: true }, setDirect, true, "boolean");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updatePrivateProfileRequest:", () => {
        const worker = updatePrivateProfileRequest(updatePrivateProfile({ privateProfile: true }));
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserSettingsApi.updatePrivateProfile, { privateProfile: true }, true);
        testSetResponse(worker, { data: true }, setPrivateProfile, true, "boolean");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updateColorSchemeRequest:", () => {
        const worker = updateColorSchemeRequest(updateColorScheme({ colorScheme: ColorScheme.BLUE }));
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserSettingsApi.updateColorScheme, { colorScheme: ColorScheme.BLUE }, "BLUE");
        testSetResponse(worker, { data: "BLUE" }, setColorScheme, "BLUE", "string");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("updateBackgroundColorRequest:", () => {
        const worker = updateBackgroundColorRequest(updateBackgroundColor({ backgroundColor: BackgroundTheme.DIM }));
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.LOADING);
        testCall(worker, UserSettingsApi.updateBackgroundColor, { backgroundColor: BackgroundTheme.DIM }, "DIM");
        testSetResponse(worker, { data: "DIM" }, setBackgroundColor, "DIM", "string");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("processUserToBlocklistRequest:", () => {
        const mockPayload = { userId: 1, tweetId: 1, isUserBlocked: true };
        const worker = processUserToBlocklistRequest(processUserToBlocklist({ userId: 1, tweetId: 1 }));

        testCall(worker, BlockUserApi.processBlockList, 1, true);
        testSetResponse(worker, { data: true }, setBlockedToTweetsState, mockPayload, "boolean");
        testSetResponse(worker, true, setBlockedUsersTweetState, mockPayload, "boolean");
        testSetResponse(worker, true, setBlocked, true, "boolean");
        testSetResponse(worker, true, setBlockUserDetail, true, "boolean");
        testSetResponse(worker, true, setBlockedUser, { userId: 1, isUserBlocked: true }, "boolean");
        testSetResponse(worker, true, setBlockedUsersState, { userId: 1, isUserBlocked: true }, "boolean");
        testSetResponse(worker, true, setBlockUsersSearchState, { userId: 1, isUserBlocked: true }, "boolean");
        testSetResponse(worker, true, setBlockedToTweetState, true, "boolean");
        testSetResponse(worker, true, setBlockedNotificationInfo, true, "boolean");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("processUserToMuteListRequest:", () => {
        const mockPayload = { userId: 1, tweetId: 1, isUserMuted: true };
        const worker = processUserToMuteListRequest(processUserToMuteList({ userId: 1, tweetId: 1 }));

        testCall(worker, MuteUserApi.processMutedList, 1, true);
        testSetResponse(worker, { data: true }, setMutedToTweetsState, mockPayload, "boolean");
        testSetResponse(worker, true, setMutedUsersTweetState, mockPayload, "boolean");
        testSetResponse(worker, true, setMuted, true, "boolean");
        testSetResponse(worker, true, setMutedUser, { userId: 1, isUserMuted: true }, "boolean");
        testSetResponse(worker, true, setMutedUsersState, { userId: 1, isUserMuted: true }, "boolean");
        testSetResponse(worker, true, setMutedToTweetState, true, "boolean");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    describe("processFollowRequests:", () => {
        const mockUserProfileResponse = {
            data: {
                id: 1,
                isWaitingForApprove: true
            }
        } as AxiosResponse<UserProfileResponse>;
        const mockPayload = { userId: 1, isWaitingForApprove: true };
        const worker = processFollowRequests(processFollowRequest(1));

        testCall(worker, FollowerUserApi.processFollowRequestToPrivateProfile, 1, mockUserProfileResponse);
        testSetResponse(worker, mockUserProfileResponse, setFollowRequestToUserProfile, true, "boolean");
        testSetResponse(worker, mockUserProfileResponse, setFollowRequestToUserDetail, true, "boolean");
        testSetResponse(worker, mockUserProfileResponse, setFollowRequestToUsers, mockPayload, "boolean");
        testSetResponse(worker, mockUserProfileResponse, setFollowRequestToUsersSearchState, mockPayload, "boolean");
        testSetResponse(worker, mockUserProfileResponse, setFollowRequestToNotificationInfo, true, "boolean");
        testLoadingStatus(worker, setUserLoadingStatus, LoadingStatus.ERROR);
    });

    testWatchSaga(userSaga, [
        { actionType: UserActionsType.UPDATE_USER_DATA, workSaga: updateUserDataRequest },
        { actionType: UserActionsType.FETCH_SIGN_IN, workSaga: fetchSignInRequest },
        { actionType: UserActionsType.FETCH_SIGN_UP, workSaga: fetchSignUpRequest },
        { actionType: UserActionsType.FETCH_USER_DATA, workSaga: fetchUserDataRequest },
        { actionType: UserActionsType.FOLLOW_USER, workSaga: processFollowUserRequest },
        { actionType: UserActionsType.UNFOLLOW_USER, workSaga: processFollowUserRequest },
        { actionType: UserActionsType.START_USE_TWITTER, workSaga: startUseTwitterRequest },
        { actionType: UserActionsType.FETCH_PIN_TWEET, workSaga: fetchPinTweetRequest },
        { actionType: UserActionsType.FETCH_READ_MESSAGES, workSaga: fetchReadMessagesRequest },
        { actionType: UserActionsType.UPDATE_USERNAME, workSaga: updateUsernameRequest },
        { actionType: UserActionsType.UPDATE_EMAIL, workSaga: updateEmailRequest },
        { actionType: UserActionsType.UPDATE_PHONE, workSaga: updatePhoneRequest },
        { actionType: UserActionsType.UPDATE_COUNTRY, workSaga: updateCountryRequest },
        { actionType: UserActionsType.UPDATE_GENDER, workSaga: updateGenderRequest },
        { actionType: UserActionsType.UPDATE_LANGUAGE, workSaga: updateLanguageRequest },
        { actionType: UserActionsType.UPDATE_DIRECT, workSaga: updateDirectRequest },
        { actionType: UserActionsType.UPDATE_PRIVATE_PROFILE, workSaga: updatePrivateProfileRequest },
        { actionType: UserActionsType.UPDATE_COLOR_SCHEME, workSaga: updateColorSchemeRequest },
        { actionType: UserActionsType.UPDATE_BACKGROUND_COLOR, workSaga: updateBackgroundColorRequest },
        { actionType: UserActionsType.PROCESS_USER_TO_BLOCKLIST, workSaga: processUserToBlocklistRequest },
        { actionType: UserActionsType.PROCESS_USER_TO_MUTELIST, workSaga: processUserToMuteListRequest },
        { actionType: UserActionsType.PROCESS_FOLLOW_REQUEST, workSaga: processFollowRequests }
    ]);
});
