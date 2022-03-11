import {Action} from "redux";
import {FollowerUserResponse} from "../../../types/user";
import {LoadingStatus} from "../../../types";

export enum FollowerRequestsActionsType {
    SET_FOLLOWER_REQUESTS = 'followerRequests/SET_FOLLOWER_REQUESTS',
    FETCH_FOLLOWER_REQUESTS = 'followerRequests/FETCH_FOLLOWER_REQUESTS',
    ACCEPT_FOLLOW_REQUEST = 'followerRequests/ACCEPT_FOLLOW_REQUEST',
    DECLINE_FOLLOW_REQUEST = 'followerRequests/DECLINE_FOLLOW_REQUEST',
    PROCESS_FOLLOW_REQUEST = 'followerRequests/PROCESS_FOLLOW_REQUEST',
    RESET_FOLLOWER_REQUESTS_STATE = "followerRequests/RESET_FOLLOWER_REQUESTS_STATE",
    SET_LOADING_STATE = "followerRequests/SET_FOLLOWER_REQUESTS_LOADING_STATE",
}

export interface SetFollowerRequestsActionInterface extends Action<FollowerRequestsActionsType> {
    type: FollowerRequestsActionsType.SET_FOLLOWER_REQUESTS;
    payload: FollowerUserResponse[];
}

export interface FetchFollowerRequestsActionInterface extends Action<FollowerRequestsActionsType> {
    type: FollowerRequestsActionsType.FETCH_FOLLOWER_REQUESTS;
}

export interface AcceptFollowerRequestActionInterface extends Action<FollowerRequestsActionsType> {
    type: FollowerRequestsActionsType.ACCEPT_FOLLOW_REQUEST;
    payload: number;
}

export interface DeclineFollowerRequestActionInterface extends Action<FollowerRequestsActionsType> {
    type: FollowerRequestsActionsType.DECLINE_FOLLOW_REQUEST;
    payload: number;
}

export interface ProcessFollowerRequestActionInterface extends Action<FollowerRequestsActionsType> {
    type: FollowerRequestsActionsType.PROCESS_FOLLOW_REQUEST;
    payload: number;
}

export interface ResetFollowerRequestsStateActionInterface extends Action<FollowerRequestsActionsType> {
    type: FollowerRequestsActionsType.RESET_FOLLOWER_REQUESTS_STATE;
}

export interface SetFollowerRequestsLoadingStateActionInterface extends Action<FollowerRequestsActionsType> {
    type: FollowerRequestsActionsType.SET_LOADING_STATE;
    payload: LoadingStatus;
}

export type FollowerRequestsActions =
    | SetFollowerRequestsActionInterface
    | ProcessFollowerRequestActionInterface
    | ResetFollowerRequestsStateActionInterface
    | SetFollowerRequestsLoadingStateActionInterface;
