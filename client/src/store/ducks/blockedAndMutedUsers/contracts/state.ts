import {LoadingStatus} from "../../../types";
import {BlockedUserResponse, MutedUserResponse} from "../../../types/user";

export interface BlockedAndMutedUsersState {
    blockedUsers: BlockedUserResponse[];
    mutedUsers: MutedUserResponse[];
    loadingState: LoadingStatus;
}
