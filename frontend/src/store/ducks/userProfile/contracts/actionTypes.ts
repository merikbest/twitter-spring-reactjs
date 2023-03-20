import { Action } from "redux";
import { UserProfileResponse } from "../../../../types/user";
import { ChatParticipantRequest, UserProfileState } from "./state";
import { LoadingStatus } from "../../../../types/common";
import { FollowUsersPayload } from "../../users/contracts/state";

export enum UserProfileActionsType {
    FETCH_USER = "userProfile/FETCH_USER",
    SET_USER = "userProfile/SET_USER",
    SET_BLOCKED = "userProfile/SET_BLOCKED",
    SET_MUTED = "userProfile/SET_MUTED",
    SET_FOLLOW_TO_USER_PROFILE = "userProfile/SET_FOLLOW_TO_USER_PROFILE",
    SET_SUBSCRIBE_TO_USER_PROFILE = "userProfile/SET_SUBSCRIBE_TO_USER_PROFILE",
    PROCESS_SUBSCRIBE = "userProfile/PROCESS_SUBSCRIBE",
    RESET_USER_PROFILE_STATE = "userProfile/RESET_USER_PROFILE_STATE",
    SET_USER_LOADING_STATE = "userProfile/SET_USER_LOADING_STATE",
    SET_FOLLOW_REQUEST_TO_USER_PROFILE = "userProfile/SET_FOLLOW_REQUEST_TO_USER_PROFILE",
    FETCH_CHAT_PARTICIPANT = "userProfile/FETCH_CHAT_PARTICIPANT",
    // images
    FETCH_IMAGES = "userProfile/FETCH_IMAGES",
    SET_IMAGES = "userProfile/SET_IMAGES",
    RESET_IMAGES_STATE = "userProfile/RESET_IMAGES_STATE",
    SET_IMAGES_LOADING_STATE = "userProfile/SET_IMAGES_LOADING_STATE",
}

export interface FetchUserProfileActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.FETCH_USER;
    payload: number;
}

export interface SetUserProfileActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.SET_USER;
    payload: UserProfileResponse;
}

export interface SetBlockedActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.SET_BLOCKED;
    payload: boolean;
}

export interface SetMutedActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.SET_MUTED;
    payload: boolean;
}

export interface SetFollowToUserProfileActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE;
    payload: FollowUsersPayload;
}

export interface SetSubscribeToUserProfileActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.SET_SUBSCRIBE_TO_USER_PROFILE;
    payload: boolean;
}

export interface ProcessSubscribeActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.PROCESS_SUBSCRIBE;
    payload: number;
}

export interface SetFollowRequestToUserProfileActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.SET_FOLLOW_REQUEST_TO_USER_PROFILE;
    payload: boolean;
}

export interface FetchChatParticipantActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.FETCH_CHAT_PARTICIPANT;
    payload: ChatParticipantRequest;
}

export interface ResetUserProfileStateActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.RESET_USER_PROFILE_STATE;
}

export interface SetUserProfileLoadingStatusActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}

// images
export interface FetchImagesActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.FETCH_IMAGES;
    payload: number;
}

export interface SetImagesActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.SET_IMAGES;
    payload: UserProfileState["images"];
}

export interface ResetImagesStateActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.RESET_IMAGES_STATE;
}

export interface SetImagesLoadingStatusActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.SET_IMAGES_LOADING_STATE;
    payload: LoadingStatus;
}

export type UserProfileActions =
    | SetUserProfileActionInterface
    | ResetUserProfileStateActionInterface
    | SetUserProfileLoadingStatusActionInterface
    | SetBlockedActionInterface
    | SetMutedActionInterface
    | SetFollowToUserProfileActionInterface
    | SetSubscribeToUserProfileActionInterface
    | SetFollowRequestToUserProfileActionInterface
    | SetImagesActionInterface
    | ResetImagesStateActionInterface
    | SetImagesLoadingStatusActionInterface;
