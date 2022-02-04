import {User} from "../user/contracts/state";
import {
    FetchChatParticipantActionInterface,
    FetchUserProfileActionInterface,
    FollowProfileActionInterface,
    FollowUserProfileActionInterface,
    ProcessFollowRequestActionInterface,
    ProcessSubscribeActionInterface,
    ResetUserProfileActionInterface,
    ResetUserProfileStateActionInterface,
    SetUserProfileActionInterface,
    SetUserProfileLoadingStatusActionInterface,
    UnfollowProfileActionInterface,
    UnfollowUserProfileActionInterface,
    UpdateUserDataActionInterface,
    UserProfileActionsType,
} from './contracts/actionTypes';
import {UserProfileState} from "./contracts/state";

export const setUserProfile = (payload: User): SetUserProfileActionInterface => ({
    type: UserProfileActionsType.SET_USER,
    payload
});

export const updatedUserData = (payload: User): UpdateUserDataActionInterface => ({
    type: UserProfileActionsType.UPDATE_USER_DATA,
    payload
});

export const fetchUserProfile = (payload: string): FetchUserProfileActionInterface => ({
    type: UserProfileActionsType.FETCH_USER,
    payload
});

export const fetchChatParticipant = (payload: { participantId: number, chatId: number }): FetchChatParticipantActionInterface => ({
    type: UserProfileActionsType.FETCH_CHAT_PARTICIPANT,
    payload
});

export const resetUserProfile = (): ResetUserProfileActionInterface => ({
    type: UserProfileActionsType.RESET_USER,
});

export const followProfile = (payload: User): FollowProfileActionInterface => ({
    type: UserProfileActionsType.FOLLOW,
    payload
});

export const unfollowProfile = (payload: User): UnfollowProfileActionInterface => ({
    type: UserProfileActionsType.UNFOLLOW,
    payload
});

export const followUserProfile = (payload: User): FollowUserProfileActionInterface => ({
    type: UserProfileActionsType.FOLLOW_USER,
    payload
});

export const unfollowUserProfile = (payload: User): UnfollowUserProfileActionInterface => ({
    type: UserProfileActionsType.UNFOLLOW_USER,
    payload
});

export const processSubscribe = (payload: number): ProcessSubscribeActionInterface => ({
    type: UserProfileActionsType.PROCESS_SUBSCRIBE,
    payload
});

export const processFollowRequest = (payload: number): ProcessFollowRequestActionInterface => ({
    type: UserProfileActionsType.PROCESS_FOLLOW_REQUEST,
    payload,
});

export const resetUserProfileStateAction = (): ResetUserProfileStateActionInterface => ({
    type: UserProfileActionsType.RESET_USER_PROFILE_STATE
});

export const setUserProfileLoadingState = (payload: UserProfileState["loadingState"]): SetUserProfileLoadingStatusActionInterface => ({
    type: UserProfileActionsType.SET_USER_LOADING_STATE,
    payload
});
