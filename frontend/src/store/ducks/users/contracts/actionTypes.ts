import { Action } from "redux";
import {
    BlockedUsersPayload,
    FollowRequestUsersPayload,
    FollowUsersPayload,
    MutedUsersPayload,
    SubscribedUsersPayload,
    UsersState
} from "./state";
import { LoadingStatus, PageableResponse } from "../../../../types/common";

export enum UsersActionsType {
    FETCH_USERS = "users/FETCH_USERS",
    FETCH_RELEVANT_USERS = "users/FETCH_RELEVANT_USERS",
    SET_USERS = "users/SET_USERS", // TODO DELETE
    SET_PAGEABLE_USERS = "users/SET_PAGEABLE_USERS",
    SET_FOLLOW_TO_USERS_STATE = "users/SET_FOLLOW_TO_USERS_STATE",
    SET_FOLLOW_REQUEST_TO_USERS_STATE = "users/SET_FOLLOW_REQUEST_TO_USERS_STATE",
    SET_BLOCKED_USERS_STATE = "users/SET_BLOCKED_USERS_STATE",
    SET_MUTED_USERS_STATE = "users/SET_MUTED_USERS_STATE",
    SET_SUBSCRIBED_USERS_STATE = "users/SET_SUBSCRIBED_USERS_STATE",
    RESET_USERS_STATE = "users/RESET_USERS_STATE",
    SET_USER_LOADING_STATE = "users/SET_USER_LOADING_STATE",
}

export interface FetchUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_USERS;
    payload: number;
}

export interface FetchRelevantUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.FETCH_RELEVANT_USERS;
}

export interface SetUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_USERS;
    payload: UsersState["users"];
}

export interface SetPageableUsersActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_PAGEABLE_USERS;
    payload: PageableResponse<UsersState["users"]>;
}

export interface SetFollowToUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_FOLLOW_TO_USERS_STATE;
    payload: FollowUsersPayload;
}

export interface SetFollowRequestToUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_FOLLOW_REQUEST_TO_USERS_STATE;
    payload: FollowRequestUsersPayload;
}

export interface SetBlockedUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_BLOCKED_USERS_STATE;
    payload: BlockedUsersPayload;
}

export interface SetMutedUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_MUTED_USERS_STATE;
    payload: MutedUsersPayload;
}

export interface SetSubscribedUsersStateActionInterface extends Action<UsersActionsType> {
    type: UsersActionsType.SET_SUBSCRIBED_USERS_STATE;
    payload: SubscribedUsersPayload;
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
    | SetPageableUsersActionInterface
    | ResetUsersStateActionInterface
    | SetUsersLoadingStatusActionInterface
    | SetFollowToUsersStateActionInterface
    | SetFollowRequestToUsersStateActionInterface
    | SetBlockedUsersStateActionInterface
    | SetMutedUsersStateActionInterface
    | SetSubscribedUsersStateActionInterface;
