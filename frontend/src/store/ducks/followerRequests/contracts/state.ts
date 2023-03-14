import { FollowerUserResponse } from "../../../../types/user";
import { LoadingStatus } from "../../../../types/common";

export interface FollowerRequestsState {
    items: FollowerUserResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}
