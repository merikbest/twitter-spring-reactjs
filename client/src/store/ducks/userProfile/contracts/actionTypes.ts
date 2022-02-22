import {Action} from "redux";
import {User} from "../../user/contracts/state";
import {LoadingStatus} from "../../../types";
import {AuthUserResponse, UserProfileResponse} from "../../../types/user";

export enum UserProfileActionsType {
    SET_USER = 'userProfile/SET_USER',
    FETCH_USER = 'userProfile/FETCH_USER',  // +
    FETCH_CHAT_PARTICIPANT = 'userProfile/FETCH_CHAT_PARTICIPANT',

    // FOLLOW = 'userProfile/FOLLOW',
    // UNFOLLOW = 'userProfile/UNFOLLOW',
    // FOLLOW_USER = 'userProfile/FOLLOW_USER',
    // UNFOLLOW_USER = 'userProfile/UNFOLLOW_USER',



    PROCESS_SUBSCRIBE = 'userProfile/PROCESS_SUBSCRIBE',
    PROCESS_FOLLOW_REQUEST = 'userProfile/PROCESS_FOLLOW_REQUEST',
    RESET_USER_PROFILE_STATE = "userProfile/RESET_USER_PROFILE_STATE",
    SET_USER_LOADING_STATE = 'userProfile/SET_USER_LOADING_STATE',
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    ADD_USER_TO_BLOCKLIST = 'userProfile/ADD_USER_TO_BLOCKLIST', // +
    ADD_USER_TO_MUTELIST = 'userProfile/ADD_USER_TO_MUTELIST', // +
    SET_BLOCKED = 'userProfile/SET_BLOCKED', // +
    SET_MUTED = 'userProfile/SET_MUTED', // +
    SET_FOLLOW_TO_USER_PROFILE = 'userProfile/FOLLOW_TO_USER_PROFILE', // +

}

export interface AddUserToBlocklistActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.ADD_USER_TO_BLOCKLIST;
    payload: number;
}

export interface AddUserToMuteListActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.ADD_USER_TO_MUTELIST;
    payload: number;
}

export interface SetBlockedActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_BLOCKED;
    payload: boolean;
}

export interface SetMutedActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_MUTED;
    payload: boolean;
}

export interface SeFollowToUserProfileActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_FOLLOW_TO_USER_PROFILE;
    payload: boolean;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export interface SetUserProfileActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_USER;
    payload: UserProfileResponse;
}

export interface FetchUserProfileActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.FETCH_USER;
    payload: number;
}

export interface FetchChatParticipantActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.FETCH_CHAT_PARTICIPANT;
    payload: { participantId: number, chatId: number };
}

// export interface FollowProfileActionInterface extends Action<UserProfileActionsType> {
//     type: UserProfileActionsType.FOLLOW;
//     payload: User;
// }
//
// export interface UnfollowProfileActionInterface extends Action<UserProfileActionsType> {
//     type: UserProfileActionsType.UNFOLLOW;
//     payload: User;
// }
//
// export interface FollowUserProfileActionInterface extends Action<UserProfileActionsType> {
//     type: UserProfileActionsType.FOLLOW_USER;
//     payload: User;
// }
//
// export interface UnfollowUserProfileActionInterface extends Action<UserProfileActionsType> {
//     type: UserProfileActionsType.UNFOLLOW_USER;
//     payload: User;
// }

export interface ProcessSubscribeActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.PROCESS_SUBSCRIBE;
    payload: number;
}

export interface ProcessFollowRequestActionInterface extends Action<UserProfileActionsType> {
    type: UserProfileActionsType.PROCESS_FOLLOW_REQUEST;
    payload: number;
}

export interface ResetUserProfileStateActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.RESET_USER_PROFILE_STATE;
}

export interface SetUserProfileLoadingStatusActionInterface extends Action<UserProfileActionsType> { // +
    type: UserProfileActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}

export type UserProfileActions =
    | SetUserProfileActionInterface // +
    // | FollowProfileActionInterface
    // | UnfollowProfileActionInterface
    | ResetUserProfileStateActionInterface // +
    | SetUserProfileLoadingStatusActionInterface // +
    | SetBlockedActionInterface // +
    | SetMutedActionInterface // +
    | SeFollowToUserProfileActionInterface;  // +
