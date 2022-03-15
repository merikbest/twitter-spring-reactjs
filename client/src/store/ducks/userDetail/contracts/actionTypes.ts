import {Action} from "redux";
import {LoadingStatus} from "../../../types";
import {UserDetailResponse} from "../../../types/user";
import {CancelTokenSource} from "axios";

export enum UserDetailActionsType {
    SET_USER_DETAIL = 'userDetail/SET_USER_DETAIL',
    SET_FOLLOW_TO_USER_DETAIL = 'userDetail/SET_FOLLOW_TO_USER_DETAIL',
    SET_BLOCK_USER_DETAIL = 'userDetail/SET_BLOCK_USER_DETAIL',
    SET_FOLLOW_REQUEST_TO_USER_DETAIL = 'userProfile/SET_FOLLOW_REQUEST_TO_USER_DETAIL',
    FETCH_USER_DETAIL = 'userDetail/FETCH_USER_DETAIL',
    RESET_USER_DETAIL_STATE = 'userDetail/RESET_USER_DETAIL_STATE',
    SET_LOADING_STATE = 'userDetail/SET_LOADING_STATE',
}

export interface SetUserDetailActionInterface extends Action<UserDetailActionsType> {
    type: UserDetailActionsType.SET_USER_DETAIL;
    payload: UserDetailResponse;
}

export interface SetFollowToUserDetailActionInterface extends Action<UserDetailActionsType> {
    type: UserDetailActionsType.SET_FOLLOW_TO_USER_DETAIL;
    payload: boolean;
}

export interface SetBlockUserDetailActionInterface extends Action<UserDetailActionsType> {
    type: UserDetailActionsType.SET_BLOCK_USER_DETAIL;
    payload: boolean;
}

export interface SetFollowRequestToUserDetailActionInterface extends Action<UserDetailActionsType> {
    type: UserDetailActionsType.SET_FOLLOW_REQUEST_TO_USER_DETAIL;
    payload: boolean;
}

export interface FetchUserDetailActionInterface extends Action<UserDetailActionsType> {
    type: UserDetailActionsType.FETCH_USER_DETAIL;
    payload: { userId: number, cancelTokenSource: CancelTokenSource }
}

export interface ResetUserDetailStateActionInterface extends Action<UserDetailActionsType> {
    type: UserDetailActionsType.RESET_USER_DETAIL_STATE;
}

export interface SetUserDetailLoadingStateActionInterface extends Action<UserDetailActionsType> {
    type: UserDetailActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type UserDetailActions =
    | SetUserDetailActionInterface
    | SetFollowToUserDetailActionInterface
    | SetBlockUserDetailActionInterface
    | SetFollowRequestToUserDetailActionInterface
    | ResetUserDetailStateActionInterface
    | SetUserDetailLoadingStateActionInterface;
