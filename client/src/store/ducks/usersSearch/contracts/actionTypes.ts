import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {
    BlockedUsersPayload,
    FollowersRequest,
    FollowRequestUsersPayload,
    FollowUsersPayload,
    SearchByNameRequest,
    UsersSearchState
} from "./state";
import {PageableResponse} from "../../../types/common";

export enum UsersSearchActionsType {
    SET_USERS = 'usersSearch/SET_USERS',
    SET_PAGEABLE_USERS = 'usersSearch/SET_PAGEABLE_USERS',
    SET_FOLLOWERS = 'usersSearch/SET_FOLLOWERS',
    SET_PAGEABLE_FOLLOWERS = 'usersSearch/SET_PAGEABLE_FOLLOWERS',
    SET_FOLLOW_TO_USERS_SEARCH_STATE = 'usersSearch/SET_FOLLOW_TO_USERS_SEARCH_STATE',
    SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE = 'usersSearch/SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE',
    SET_BLOCK_USERS_SEARCH_STATE = 'usersSearch/SET_BLOCK_USERS_SEARCH_STATE',
    FETCH_USERS = 'usersSearch/FETCH_USERS',
    FETCH_USERS_BY_NAME = 'usersSearch/FETCH_USERS_BY_NAME',
    FETCH_PARTICIPANTS_BY_NAME = 'usersSearch/FETCH_PARTICIPANTS_BY_NAME',
    FETCH_FOLLOWERS = 'usersSearch/FETCH_FOLLOWERS',
    FETCH_FOLLOWINGS = 'usersSearch/FETCH_FOLLOWINGS',
    RESET_USERS_STATE = 'usersSearch/RESET_USERS_STATE',
    SET_USERS_LOADING_STATE = 'usersSearch/SET_USER_LOADING_STATE',
}

export interface SetUsersSearchActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_USERS;
    payload: UsersSearchState["users"];
}

export interface SetPageableUsersSearchActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_PAGEABLE_USERS;
    payload: PageableResponse<UsersSearchState["users"]>;
}

export interface SetFollowersActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_FOLLOWERS;
    payload: UsersSearchState["followers"];
}

export interface SetPageableFollowersActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_PAGEABLE_FOLLOWERS;
    payload: PageableResponse<UsersSearchState["followers"]>;
}

export interface SetFollowToUsersSearchStateActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_FOLLOW_TO_USERS_SEARCH_STATE;
    payload: FollowUsersPayload;
}

export interface SetFollowRequestToUsersSearchStateActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_FOLLOW_REQUEST_TO_USERS_SEARCH_STATE;
    payload: FollowRequestUsersPayload;
}

export interface SetBlockUsersSearchStateActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_BLOCK_USERS_SEARCH_STATE;
    payload: BlockedUsersPayload;
}

export interface FetchUsersSearchActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.FETCH_USERS;
    payload: number;
}

export interface FetchUsersSearchByNameActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.FETCH_USERS_BY_NAME;
    payload: SearchByNameRequest;
}

export interface FetchParticipantsSearchByNameActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.FETCH_PARTICIPANTS_BY_NAME;
    payload: SearchByNameRequest;
}

export interface FetchFollowersActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.FETCH_FOLLOWERS;
    payload: FollowersRequest;
}

export interface FetchFollowingsActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.FETCH_FOLLOWINGS;
    payload: FollowersRequest;
}

export interface ResetUsersStateActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.RESET_USERS_STATE;
}

export interface SetUsersSearchLoadingStatusActionInterface extends Action<UsersSearchActionsType> {
    type: UsersSearchActionsType.SET_USERS_LOADING_STATE;
    payload: LoadingStatus;
}

export type UsersSearchActions =
    | SetUsersSearchActionInterface
    | SetPageableUsersSearchActionInterface
    | SetFollowersActionInterface
    | SetPageableFollowersActionInterface
    | SetFollowToUsersSearchStateActionInterface
    | SetFollowRequestToUsersSearchStateActionInterface
    | SetBlockUsersSearchStateActionInterface
    | ResetUsersStateActionInterface
    | SetUsersSearchLoadingStatusActionInterface;
