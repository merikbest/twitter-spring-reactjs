import { ChangePhoneResponse, SettingsRequest, UserActionRequest, UserRequest, UserState } from "./contracts/state";
import {
    FetchPinTweetActionInterface,
    FetchReadMessagesActionInterface,
    FetchSignInActionInterface,
    FetchSignUpActionInterface,
    FetchUserDataActionInterface,
    FollowUserActionInterface,
    ProcessFollowRequestActionInterface,
    ProcessUserToBlocklistActionInterface,
    ProcessUserToMuteListActionInterface,
    ResetMentionsActionInterface,
    ResetNotificationsActionInterface,
    SetBackgroundColorActionInterface,
    SetColorSchemeActionInterface,
    SetCountryActionInterface,
    SetDirectActionInterface,
    SetEmailActionInterface,
    SetFollowersSizeActionInterface,
    SetGenderActionInterface,
    SetLanguageActionInterface,
    SetNewMentionActionInterface,
    SetNewNotificationActionInterface,
    SetPhoneActionInterface,
    SetPinTweetIdActionInterface,
    SetPrivateProfileActionInterface,
    SetProfileStartedActionInterface,
    SetReadMessageActionInterface,
    SetUnreadMessageActionInterface,
    SetUserDataActionInterface,
    SetUserFollowingActionInterface,
    SetUserLoadingStateActionInterface,
    SetUsernameActionInterface,
    SignOutActionInterface,
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
    UpdateUserDataActionInterface,
    UpdateUsernameActionInterface,
    UserActionsType
} from "./contracts/actionTypes";
import { EndRegistrationRequest } from "../../../pages/Authentication/SetPasswordModal/SetPasswordModal";
import { ChatMessageResponse } from "../../../types/chat";
import { LoginRequest } from "../../../types/auth";

export const updatedUserData = (payload: UserRequest): UpdateUserDataActionInterface => ({
    type: UserActionsType.UPDATE_USER_DATA,
    payload
});

export const setFollowersSize = (): SetFollowersSizeActionInterface => ({
    type: UserActionsType.SET_FOLLOWERS_SIZE
});

export const setProfileStarted = (payload: boolean): SetProfileStartedActionInterface => ({
    type: UserActionsType.SET_PROFILE_STARTED,
    payload
});

export const setPinTweetId = (payload: number): SetPinTweetIdActionInterface => ({
    type: UserActionsType.SET_PIN_TWEET_ID,
    payload
});

export const setReadMessage = (payload: number): SetReadMessageActionInterface => ({
    type: UserActionsType.SET_READ_MESSAGE,
    payload
});

export const setUserData = (payload: UserState["data"]): SetUserDataActionInterface => ({
    type: UserActionsType.SET_USER_DATA,
    payload
});

export const signOut = (): SignOutActionInterface => ({
    type: UserActionsType.SIGN_OUT
});

export const fetchSignIn = (payload: LoginRequest): FetchSignInActionInterface => ({
    type: UserActionsType.FETCH_SIGN_IN,
    payload
});

export const fetchSignUp = (payload: EndRegistrationRequest): FetchSignUpActionInterface => ({
    type: UserActionsType.FETCH_SIGN_UP,
    payload
});

export const fetchUserData = (): FetchUserDataActionInterface => ({
    type: UserActionsType.FETCH_USER_DATA
});

export const setUserLoadingStatus = (payload: UserState["status"]): SetUserLoadingStateActionInterface => ({
    type: UserActionsType.SET_USER_LOADING_STATE,
    payload
});

export const followUser = (payload: UserActionRequest): FollowUserActionInterface => ({
    type: UserActionsType.FOLLOW_USER,
    payload
});

export const unfollowUser = (payload: UserActionRequest): UnfollowUserActionInterface => ({
    type: UserActionsType.UNFOLLOW_USER,
    payload
});

export const setUserFollowing = (payload: boolean): SetUserFollowingActionInterface => ({
    type: UserActionsType.SET_USER_FOLLOWING,
    payload
});

export const fetchPinTweet = (payload: number): FetchPinTweetActionInterface => ({
    type: UserActionsType.FETCH_PIN_TWEET,
    payload
});

export const processFollowRequest = (payload: number): ProcessFollowRequestActionInterface => ({
    type: UserActionsType.PROCESS_FOLLOW_REQUEST,
    payload
});

export const processUserToBlocklist = (payload: UserActionRequest): ProcessUserToBlocklistActionInterface => ({
    type: UserActionsType.PROCESS_USER_TO_BLOCKLIST,
    payload
});

export const processUserToMuteList = (payload: UserActionRequest): ProcessUserToMuteListActionInterface => ({
    type: UserActionsType.PROCESS_USER_TO_MUTELIST,
    payload
});

export const startUseTwitter = (): StartUseTwitterActionInterface => ({
    type: UserActionsType.START_USE_TWITTER,
});

export const fetchReadMessages = (payload: number): FetchReadMessagesActionInterface => ({
    type: UserActionsType.FETCH_READ_MESSAGES,
    payload
});

export const setUnreadMessage = (payload: ChatMessageResponse): SetUnreadMessageActionInterface => ({
    type: UserActionsType.SET_UNREAD_MESSAGE,
    payload
});

export const setNewNotification = (): SetNewNotificationActionInterface => ({
    type: UserActionsType.SET_NEW_NOTIFICATION
});

export const resetNotifications = (): ResetNotificationsActionInterface => ({
    type: UserActionsType.RESET_NOTIFICATIONS
});

export const setNewMention = (): SetNewMentionActionInterface => ({
    type: UserActionsType.SET_NEW_MENTION
});

export const resetMentions = (): ResetMentionsActionInterface => ({
    type: UserActionsType.RESET_MENTIONS
});

export const updateUsername = (payload: SettingsRequest): UpdateUsernameActionInterface => ({
    type: UserActionsType.UPDATE_USERNAME,
    payload
});

export const updateEmail = (payload: SettingsRequest): UpdateEmailActionInterface => ({
    type: UserActionsType.UPDATE_EMAIL,
    payload
});

export const updatePhone = (payload: SettingsRequest): UpdatePhoneActionInterface => ({
    type: UserActionsType.UPDATE_PHONE,
    payload
});

export const updateCountry = (payload: SettingsRequest): UpdateCountryActionInterface => ({
    type: UserActionsType.UPDATE_COUNTRY,
    payload
});

export const updateGender = (payload: SettingsRequest): UpdateGenderActionInterface => ({
    type: UserActionsType.UPDATE_GENDER,
    payload
});

export const updateLanguage = (payload: SettingsRequest): UpdateLanguageActionInterface => ({
    type: UserActionsType.UPDATE_LANGUAGE,
    payload
});

export const updateDirect = (payload: SettingsRequest): UpdateDirectActionInterface => ({
    type: UserActionsType.UPDATE_DIRECT,
    payload
});

export const updatePrivateProfile = (payload: SettingsRequest): UpdatePrivateProfileActionInterface => ({
    type: UserActionsType.UPDATE_PRIVATE_PROFILE,
    payload
});

export const updateColorScheme = (payload: SettingsRequest): UpdateColorSchemeActionInterface => ({
    type: UserActionsType.UPDATE_COLOR_SCHEME,
    payload
});

export const updateBackgroundColor = (payload: SettingsRequest): UpdateBackgroundColorActionInterface => ({
    type: UserActionsType.UPDATE_BACKGROUND_COLOR,
    payload
});

export const setUsername = (payload: string): SetUsernameActionInterface => ({
    type: UserActionsType.SET_USERNAME,
    payload
});

export const setEmail = (payload: string): SetEmailActionInterface => ({
    type: UserActionsType.SET_EMAIL,
    payload
});

export const setPhone = (payload: ChangePhoneResponse): SetPhoneActionInterface => ({
    type: UserActionsType.SET_PHONE,
    payload
});

export const setCountry = (payload: string): SetCountryActionInterface => ({
    type: UserActionsType.SET_COUNTRY,
    payload
});

export const setGender = (payload: string): SetGenderActionInterface => ({
    type: UserActionsType.SET_GENDER,
    payload
});

export const setLanguage = (payload: string): SetLanguageActionInterface => ({
    type: UserActionsType.SET_LANGUAGE,
    payload
});

export const setDirect = (payload: boolean): SetDirectActionInterface => ({
    type: UserActionsType.SET_DIRECT,
    payload
});

export const setPrivateProfile = (payload: boolean): SetPrivateProfileActionInterface => ({
    type: UserActionsType.SET_PRIVATE_PROFILE,
    payload
});

export const setColorScheme = (payload: string): SetColorSchemeActionInterface => ({
    type: UserActionsType.SET_COLOR_SCHEME,
    payload
});

export const setBackgroundColor = (payload: string): SetBackgroundColorActionInterface => ({
    type: UserActionsType.SET_BACKGROUND_COLOR,
    payload
});
