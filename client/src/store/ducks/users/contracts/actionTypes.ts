import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {UserResponse} from "../../../types/user";

export enum UsersActionsType {
    FETCH_USERS = 'users/FETCH_USERS',
    FETCH_RELEVANT_USERS = 'users/FETCH_RELEVANT_USERS',
    SET_USERS = 'users/SET_USERS',
    SET_FOLLOW_TO_USERS_STATE = 'users/SET_FOLLOW_TO_USERS_STATE',
    SET_FOLLOW_REQUEST_TO_USERS_STATE = 'users/SET_FOLLOW_REQUEST_TO_USERS_STATE',
    SET_BLOCKED_USERS_STATE = 'users/SET_BLOCKED_USERS_STATE',
    SET_MUTED_USERS_STATE = 'users/SET_MUTED_USERS_STATE',
    SET_SUBSCRIBED_USERS_STATE = 'users/SET_SUBSCRIBED_USERS_STATE',
    RESET_USERS_STATE = 'users/RESET_USERS_STATE',
    SET_USER_LOADING_STATE = 'users/SET_USER_LOADING_STATE',
}

export interface FetchUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_USERS;
}

export interface FetchRelevantUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_RELEVANT_USERS;
}

export interface SetUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_USERS;
    payload: UserResponse[];
}

export interface SetFollowToUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_FOLLOW_TO_USERS_STATE;
    payload: { userId: number; isFollower: boolean; };
}

export interface SetFollowRequestToUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_FOLLOW_REQUEST_TO_USERS_STATE;
    payload: { userId: number; isWaitingForApprove: boolean; };
}

export interface SetBlockedUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_BLOCKED_USERS_STATE;
    payload: { userId: number; isUserBlocked: boolean; };
}

export interface SetMutedUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_MUTED_USERS_STATE;
    payload: { userId: number; isUserMuted: boolean; };
}

export interface SetSubscribedUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_SUBSCRIBED_USERS_STATE;
    payload: { userId: number; isSubscriber: boolean; };
}

export interface ResetUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.RESET_USERS_STATE;
}

export interface SetUsersLoadingStatusActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_USER_LOADING_STATE;
    payload: LoadingStatus;
}

export type UsersActions =
    | SetUsersActionInterface
    | ResetUsersStateActionInterface
    | SetUsersLoadingStatusActionInterface
    | SetFollowToUsersStateActionInterface
    | SetFollowRequestToUsersStateActionInterface
    | SetBlockedUsersStateActionInterface
    | SetMutedUsersStateActionInterface
    | SetSubscribedUsersStateActionInterface;
