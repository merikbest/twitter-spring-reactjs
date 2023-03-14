import { BlockedUserResponse, MutedUserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

export interface BlockedAndMutedUsersState {
    blockedUsers: Array<BlockedUserResponse>;
    mutedUsers: Array<MutedUserResponse>;
    pagesCount: number;
    loadingState: LoadingStatus;
}

export interface BlockedUserPayload {
    userId: number;
    isUserBlocked: boolean;
}

export interface MutedUserPayload {
    userId: number;
    isUserMuted: boolean;
}
