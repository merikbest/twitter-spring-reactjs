import { UserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

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
    pageNumber: number;
}

export interface FollowersRequest {
    userId: number | string;
    page: number;
}
