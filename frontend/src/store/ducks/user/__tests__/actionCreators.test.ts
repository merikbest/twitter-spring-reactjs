import { testAction } from "../../../../util/test-utils/test-helper";
import {
    fetchPinTweet,
    fetchReadMessages,
    fetchSignIn,
    fetchSignUp,
    fetchUserData,
    followUser,
    processFollowRequest,
    processUserToBlocklist,
    processUserToMuteList,
    resetMentions,
    resetNotifications,
    setBackgroundColor,
    setColorScheme,
    setCountry,
    setDirect,
    setEmail,
    setFollowersSize,
    setGender,
    setLanguage,
    setNewMention,
    setNewNotification,
    setPhone,
    setPinTweetId,
    setPrivateProfile,
    setProfileStarted,
    setReadMessage,
    setUnreadMessage,
    setUserData,
    setUserFollowing,
    setUserLoadingStatus,
    setUsername,
    signOut,
    startUseTwitter,
    unfollowUser,
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
import { UserActionsType } from "../contracts/actionTypes";
import { SettingsRequest, UserRequest } from "../contracts/state";
import { AuthUserResponse } from "../../../../types/user";
import { EndRegistrationRequest } from "../../../../pages/Authentication/SetPasswordModal/SetPasswordModal";
import { ChatMessageResponse } from "../../../../types/chat";
import { LoadingStatus } from "../../../../types/common";
import { LoginRequest } from "../../../../types/auth";

describe("user actions", () => {
    testAction(updatedUserData, updatedUserData({ fullName: "text" } as UserRequest), {
        type: UserActionsType.UPDATE_USER_DATA,
        payload: { fullName: "text" } as UserRequest
    });

    testAction(setFollowersSize, setFollowersSize(), {
        type: UserActionsType.SET_FOLLOWERS_SIZE
    });

    testAction(setProfileStarted, setProfileStarted(true), {
        type: UserActionsType.SET_PROFILE_STARTED,
        payload: true
    });

    testAction(setPinTweetId, setPinTweetId(1), {
        type: UserActionsType.SET_PIN_TWEET_ID,
        payload: 1
    });

    testAction(setReadMessage, setReadMessage(1), {
        type: UserActionsType.SET_READ_MESSAGE,
        payload: 1
    });

    testAction(setUserData, setUserData({ id: 1 } as AuthUserResponse), {
        type: UserActionsType.SET_USER_DATA,
        payload: { id: 1 } as AuthUserResponse
    });

    testAction(signOut, signOut(), {
        type: UserActionsType.SIGN_OUT
    });

    testAction(fetchSignIn, fetchSignIn({ email: "test@test.test" } as LoginRequest), {
        type: UserActionsType.FETCH_SIGN_IN,
        payload: { email: "test@test.test" } as LoginRequest
    });

    testAction(fetchSignUp, fetchSignUp({ email: "test@test.test" } as EndRegistrationRequest), {
        type: UserActionsType.FETCH_SIGN_UP,
        payload: { email: "test@test.test" } as EndRegistrationRequest
    });

    testAction(fetchUserData, fetchUserData(), {
        type: UserActionsType.FETCH_USER_DATA
    });

    testAction(setUserLoadingStatus, setUserLoadingStatus(LoadingStatus.LOADING), {
        type: UserActionsType.SET_USER_LOADING_STATE,
        payload: LoadingStatus.LOADING
    });

    testAction(followUser, followUser({ userId: 1, tweetId: 1 }), {
        type: UserActionsType.FOLLOW_USER,
        payload: { userId: 1, tweetId: 1 }
    });

    testAction(unfollowUser, unfollowUser({ userId: 1, tweetId: 1 }), {
        type: UserActionsType.UNFOLLOW_USER,
        payload: { userId: 1, tweetId: 1 }
    });

    testAction(setUserFollowing, setUserFollowing(true), {
        type: UserActionsType.SET_USER_FOLLOWING,
        payload: true
    });

    testAction(fetchPinTweet, fetchPinTweet(1), {
        type: UserActionsType.FETCH_PIN_TWEET,
        payload: 1
    });

    testAction(processFollowRequest, processFollowRequest(1), {
        type: UserActionsType.PROCESS_FOLLOW_REQUEST,
        payload: 1
    });

    testAction(processUserToBlocklist, processUserToBlocklist({ userId: 1, tweetId: 1 }), {
        type: UserActionsType.PROCESS_USER_TO_BLOCKLIST,
        payload: { userId: 1, tweetId: 1 }
    });

    testAction(processUserToMuteList, processUserToMuteList({ userId: 1, tweetId: 1 }), {
        type: UserActionsType.PROCESS_USER_TO_MUTELIST,
        payload: { userId: 1, tweetId: 1 }
    });

    testAction(startUseTwitter, startUseTwitter(), {
        type: UserActionsType.START_USE_TWITTER
    });

    testAction(fetchReadMessages, fetchReadMessages(1), {
        type: UserActionsType.FETCH_READ_MESSAGES,
        payload: 1
    });

    testAction(setUnreadMessage, setUnreadMessage({ id: 1 } as ChatMessageResponse), {
        type: UserActionsType.SET_UNREAD_MESSAGE,
        payload: { id: 1 } as ChatMessageResponse
    });

    testAction(setNewNotification, setNewNotification(), {
        type: UserActionsType.SET_NEW_NOTIFICATION
    });

    testAction(resetNotifications, resetNotifications(), {
        type: UserActionsType.RESET_NOTIFICATIONS
    });

    testAction(setNewMention, setNewMention(), {
        type: UserActionsType.SET_NEW_MENTION
    });

    testAction(resetMentions, resetMentions(), {
        type: UserActionsType.RESET_MENTIONS
    });

    testAction(updateUsername, updateUsername({ username: "text" } as SettingsRequest), {
        type: UserActionsType.UPDATE_USERNAME,
        payload: { username: "text" } as SettingsRequest
    });

    testAction(updateEmail, updateEmail({ email: "test@test.test" } as SettingsRequest), {
        type: UserActionsType.UPDATE_EMAIL,
        payload: { email: "test@test.test" } as SettingsRequest
    });

    testAction(updatePhone, updatePhone({ phone: 12345 } as SettingsRequest), {
        type: UserActionsType.UPDATE_PHONE,
        payload: { phone: 12345 } as SettingsRequest
    });

    testAction(updateCountry, updateCountry({ country: "test" } as SettingsRequest), {
        type: UserActionsType.UPDATE_COUNTRY,
        payload: { country: "test" } as SettingsRequest
    });

    testAction(updateGender, updateGender({ gender: "test" } as SettingsRequest), {
        type: UserActionsType.UPDATE_GENDER,
        payload: { gender: "test" } as SettingsRequest
    });

    testAction(updateLanguage, updateLanguage({ language: "test" } as SettingsRequest), {
        type: UserActionsType.UPDATE_LANGUAGE,
        payload: { language: "test" } as SettingsRequest
    });

    testAction(updateDirect, updateDirect({ mutedDirectMessages: true } as SettingsRequest), {
        type: UserActionsType.UPDATE_DIRECT,
        payload: { mutedDirectMessages: true } as SettingsRequest
    });

    testAction(updatePrivateProfile, updatePrivateProfile({ privateProfile: true } as SettingsRequest), {
        type: UserActionsType.UPDATE_PRIVATE_PROFILE,
        payload: { privateProfile: true } as SettingsRequest
    });

    testAction(updateColorScheme, updateColorScheme({ colorScheme: "BLUE" } as SettingsRequest), {
        type: UserActionsType.UPDATE_COLOR_SCHEME,
        payload: { colorScheme: "BLUE" } as SettingsRequest
    });

    testAction(setUsername, setUsername("test"), {
        type: UserActionsType.SET_USERNAME,
        payload: "test"
    });

    testAction(setEmail, setEmail("test"), {
        type: UserActionsType.SET_EMAIL,
        payload: "test"
    });

    testAction(setPhone, setPhone({ countryCode: "text", phone: 12345 }), {
        type: UserActionsType.SET_PHONE,
        payload: { countryCode: "text", phone: 12345 }
    });

    testAction(setCountry, setCountry("test"), {
        type: UserActionsType.SET_COUNTRY,
        payload: "test"
    });

    testAction(setGender, setGender("test"), {
        type: UserActionsType.SET_GENDER,
        payload: "test"
    });

    testAction(setLanguage, setLanguage("test"), {
        type: UserActionsType.SET_LANGUAGE,
        payload: "test"
    });

    testAction(setDirect, setDirect(true), {
        type: UserActionsType.SET_DIRECT,
        payload: true
    });

    testAction(setPrivateProfile, setPrivateProfile(true), {
        type: UserActionsType.SET_PRIVATE_PROFILE,
        payload: true
    });

    testAction(setColorScheme, setColorScheme("BLUE"), {
        type: UserActionsType.SET_COLOR_SCHEME,
        payload: "BLUE"
    });

    testAction(setBackgroundColor, setBackgroundColor("BLUE"), {
        type: UserActionsType.SET_BACKGROUND_COLOR,
        payload: "BLUE"
    });
});
