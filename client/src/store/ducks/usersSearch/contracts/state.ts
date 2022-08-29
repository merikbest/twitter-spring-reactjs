import {LoadingStatus} from "../../../types";
import {UserResponse} from "../../../types/user";

export interface UsersSearchState {
    users: UserResponse[];
    pagesCount: number;
    followers: UserResponse[];
    loadingState: LoadingStatus;
}


export interface FollowUsersPayload {
    userId: number;
    isFollower: boolean;
}

export interface FollowRequestUsersPayload {
    userId: number;
    isWaitingForApprove: boolean;
}

export interface BlockedUsersPayload {
    userId: number;
    isUserBlocked: boolean;
}

export interface SearchByNameRequest {
    username: string;
    page: number;
}

export interface FollowersRequest {
    userId: number | string;
    page: number;
}
