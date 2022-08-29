import {LoadingStatus} from "../../../types";
import {UserResponse} from "../../../types/user";

export interface UsersState {
    users: Array<UserResponse>;
    pagesCount: number;
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

export interface MutedUsersPayload {
    userId: number;
    isUserMuted: boolean;
}

export interface SubscribedUsersPayload {
    userId: number;
    isSubscriber: boolean;
}
