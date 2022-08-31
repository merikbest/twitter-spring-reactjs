import {LoadingStatus} from "../../../types";
import {FollowerUserResponse} from "../../../types/user";

export interface FollowerRequestsState {
    items: FollowerUserResponse[];
    pagesCount: number;
    loadingState: LoadingStatus;
}
